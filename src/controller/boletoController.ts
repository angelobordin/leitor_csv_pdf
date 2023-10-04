import { Request, Response } from "express";
import { BoletoService } from "../service/boletoService";

export class BoletoController {
  static async getBoletoList(req: Request, res: Response) {
    try {
      const filters = req.query;
      const service = new BoletoService();
      const result = await service.getBoletoList(filters);

      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  
  static async uploadBoletosCSV(req: Request, res: Response) {
    try {
      const file = req.file;
      const service = new BoletoService();
      const result = await service.uploadBoletosCSV(file);

      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async uploadBoletosPDF(req: Request, res: Response) {
    try {
      const file = req.file as Express.Multer.File;
      const service = new BoletoService();
      const result = await service.uploadBoletosPDF(file);

      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
