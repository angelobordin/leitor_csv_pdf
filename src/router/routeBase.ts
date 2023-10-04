import { Router } from "express";
import { BoletoRoutes } from "./boletoRoutes";

export const RouteBase = Router();

RouteBase.use("/boleto", BoletoRoutes);
