import express from "express";
import cors from "cors";
import { RouteBase } from "./router/routeBase";

export class App {
  public app: express.Application;
  public port: number;

  constructor(port: number | string) {
    this.app = express();
    this.port = Number(port);
    this.initializateMiddleware();
    this.initRouteBase();
  }

  private initializateMiddleware(): void {
    console.log("Initializing Middlewares...");
    this.app.use(express.json());
    this.app.use(cors());
    console.log("Completed!");
  }

  private initRouteBase(): void {
    console.log("Initializing routes...");
    this.app.use(RouteBase);
    console.log("Completed!");
  }

  public listen(): void {
    this.app.listen(this.port, () =>
      console.log(`Server is running at port ${this.port}`)
    );
  }
}
