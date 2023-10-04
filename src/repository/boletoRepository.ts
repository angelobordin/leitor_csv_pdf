import { PrismaConnection } from "../util/database/prismaConnection";
import { BoletoUploadedCSV } from "../util/interfaces/boleto";
import { Prisma } from "@prisma/client";

export interface WhereOptions {
  nome_sacado?: any,
  valor?: {
    gt?: string,
    gte?: string,
    lt?: string,
    lte?: string
  },
  lote?: any
}

export class BoletoRepository {
  prisma = PrismaConnection.getConnection();

  public async getBoletoByName(name: string) {
    try {
      const boleto = await this.prisma.boleto.findFirst({
        where: {
          nome_sacado: {
            contains: name
          }
        }
      });
      return boleto;
    } catch (error) {
      throw error;
    }
  }

  public async getBoletoList(whereOptions: WhereOptions) {
    try {
      const boletoList = await this.prisma.boleto.findMany({
        where: whereOptions
      });
      return boletoList;
    } catch (error) {
      throw error;
    }
  }
  public async registerBoleto(boleto: BoletoUploadedCSV) {
    try {
      const lote = await this.prisma.lote.findUnique({
        where: { nome: boleto.unidade }
      })
      if (!lote) throw Error(`Lote inválido no boleto: ${boleto}`)
      const result = await this.prisma.boleto.create({
        data: {
          nome_sacado: boleto.nome,
          lote: { connect: { id: lote?.id } },
          valor: new Prisma.Decimal(boleto.valor),
          linha_digitavel: boleto.linha_digitavel,
          ativo: true,
          criado_em: new Date(Date.now()),
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
