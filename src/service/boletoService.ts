import fs from "fs";
import readline from "readline";
import pdf from "pdf-parse";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { BoletoUploadedCSV } from "./../util/interfaces/boleto";
import { Readable } from "stream";
import { WhereOptions } from "./../repository/boletoRepository";
import { BoletoFilters } from "../util/interfaces/boletoFilters";
import { BoletoRepository } from "../repository/boletoRepository";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { boleto } from "@prisma/client";
import PdfPrinter from "pdfmake";
import dotenv from 'dotenv';
dotenv.config();

export class BoletoService {
  public async getBoletoByName(name: string) {
    try {
      const repository = new BoletoRepository();
      const boleto = await repository.getBoletoByName(name);

      return boleto;
    } catch (error) {
      throw error;
    }
  }

  public async getBoletoList(filters: BoletoFilters) {
    try {
      let whereOptions: WhereOptions = {
        nome_sacado: { contains: filters.nome },
        lote: filters.id_lote
          ? { is: { id: Number(filters.id_lote) } }
          : undefined,
        valor: {
          gte: filters.valor_inicial,
          lte: filters.valor_final,
        },
      };

      const repository = new BoletoRepository();
      const boletoList = await repository.getBoletoList(whereOptions);

      if (filters.relatorio && filters.relatorio == "1") {
        // CÓDIGO PARA RETORNAR O PDF COMO VISUALIZAÇÃO NO BROWSER
        // const fonts = {
        //   Helvetica: {
        //     normal: "Helvetica",
        //     bold: "Helvetica-Bold",
        //     italics: "Helvetica-Oblique",
        //     bolditalics: "Helvetica-BoldOblique",
        //   },
        // };
        // const printer = new PdfPrinter(fonts);
        // const newPDFDoc = printer.createPdfKitDocument(docDefinitions);
        // const chunks: any[] = [];
        // newPDFDoc.on("data", (chunk) => {
        //   chunks.push(chunk);
        // });
        // newPDFDoc.end();
        // newPDFDoc.on("end", () => {
        //   const chunksBuffered = Buffer.concat(chunks);
        //   result = chunksBuffered;
        // })

        const base64String = await this.generatePdfBase64(boletoList);
        return { base64: base64String };
      } else {
        return { data: boletoList };
      }
    } catch (error) {
      throw error;
    }
  }

  public async uploadBoletosCSV(file: any) {
    try {
      if (!file) throw Error("Arquivo faltando!");

      const readableFile = new Readable();
      readableFile.push(file.buffer);
      readableFile.push(null);

      const boletosLine = readline.createInterface({
        input: readableFile,
      });

      const boletos: BoletoUploadedCSV[] = [];

      let cont = 0;
      for await (const boleto of boletosLine) {
        if (cont != 0) {
          const tmp = boleto.split(";");

          boletos.push({
            nome: tmp[0],
            unidade: tmp[1],
            valor: tmp[2],
            linha_digitavel: tmp[3],
          });
        }

        cont++;
      }

      let result;
      const repository = new BoletoRepository();
      for await (const boleto of boletos) {
        await repository.registerBoleto(boleto);
      }

      return 'Boletos importados com sucesso!';
    } catch (error) {
      throw error;
    }
  }

  public async uploadBoletosPDF(file: Express.Multer.File) {
    try {
      if (!file) throw Error("Arquivo faltando!");

      // Le o PDF
      const pdfBuffer = await fs.promises.readFile(file.path);
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      await pdfDoc.embedFont(StandardFonts.TimesRoman);

      // Itera em cada página do pdf
      for (let n = 0; n < pdfDoc.getPageCount(); n++) {

        // Gera um pdf temporário
        const pagePDF = await PDFDocument.create();
        await pagePDF.embedFont(StandardFonts.TimesRoman);

        // Copia o conteudo da pagina do pdf original para o temporario
        const copiedPage = await pagePDF.copyPages(pdfDoc, [n]);
        pagePDF.addPage(copiedPage[0]);

        pdf(Buffer.from(await pagePDF.save())).then(async (data) => {
          // Resgata o nome do titular do boleto e procura no banco
          const nameFormatted: string = data.text
            .replace(/[\r\n]+/g, "")
            .replace(/[\s]+/g, "");
          const boleto = await this.getBoletoByName(nameFormatted);

          if (!boleto) return;
          pdfMake.vfs = pdfFonts.pdfMake.vfs;
          const docDefinitions: TDocumentDefinitions = {
            defaultStyle: { font: "Helvetica" },
            content: [
              {
                table: {
                  body: [
                    [
                      "id",
                      "nome_sacado",
                      "id_lote",
                      "valor",
                      "linha_digitavel",
                    ],
                    [
                      boleto.id ?? "",
                      boleto.nome_sacado ?? "",
                      boleto.id_lote ?? "",
                      boleto.valor.toString() ?? "",
                      boleto.linha_digitavel ?? "",
                    ],
                  ],
                },
              },
            ],
          };

          const fonts = {
            Helvetica: {
              normal: "Helvetica",
              bold: "Helvetica-Bold",
              italics: "Helvetica-Oblique",
              bolditalics: "Helvetica-BoldOblique",
            },
          };

          // Gera o novo pdf com o registro do banco
          const printer = new PdfPrinter(fonts);
          const newPDFDoc = printer.createPdfKitDocument(docDefinitions);

          const chunks: any[] = [];
          newPDFDoc.on("data", (chunk: any) => {
            chunks.push(chunk);
          });

          newPDFDoc.end();
          newPDFDoc.on("end", () => {
            // Grava arquivo no caminho conforme a variavel de ambiente OUTPATH;
            fs.writeFileSync(
              `${process.env.OUTPATH}${boleto?.id}.pdf`,
              Buffer.concat(chunks)
            );
          });
        });
      }

      return {};
    } catch (error) {
      throw error;
    }
  }

  private async generatePdfBase64(boletoList: boleto[]) {
    try {
      const boletos: any[] = [];
      for await (let boleto of boletoList) {
        const boletoData = [];
        boletoData.push(boleto.id);
        boletoData.push(boleto.nome_sacado);
        boletoData.push(boleto.id_lote);
        boletoData.push(boleto.valor.toString());
        boletoData.push(boleto.linha_digitavel);

        boletos.push(boletoData);
      }

      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      const docDefinitions: TDocumentDefinitions = {
        content: [
          {
            table: {
              body: [
                ["id", "nome_sacado", "id_lote", "valor", "linha_digitavel"],
                ...boletos,
              ],
            },
          },
        ],
      };

      return new Promise<string>((resolve, reject) => {
        const pdfDocGenerator = pdfMake.createPdf(docDefinitions);
        pdfDocGenerator.getBase64((res) => {
          resolve(res);
        });
      });
    } catch (error) {
      throw error;
    }
  }
}
