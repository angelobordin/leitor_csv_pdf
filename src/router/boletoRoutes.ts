import { Router } from "express";
import { BoletoController } from "../controller/boletoController";
import { middlewareUploadCSV, middlewareUploadPDF } from "../util/middleware/multer";

export const BoletoRoutes = Router();

BoletoRoutes.get("", BoletoController.getBoletoList); //Lista Boletos
BoletoRoutes.post("/upload/csv", middlewareUploadCSV, BoletoController.uploadBoletosCSV); //Carrega boletos com csv
BoletoRoutes.post("/upload/pdf", middlewareUploadPDF, BoletoController.uploadBoletosPDF); //Carrega boletos com pdf
