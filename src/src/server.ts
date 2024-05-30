import "reflect-metadata";
import Container, { Service } from "typedi";
import { IApp } from "./interfaces/app.interface";
import { useContainer, useExpressServer } from "routing-controllers";
import userAgent from "express-useragent";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import CORS from "./middleware/cors";
import { join } from "path";
import "dotenv/config";

@Service()
export default class ExpressServer implements IApp<Application> {
  readonly server: Application;
  readonly port: number;

  private readonly API_VERSION = "v1";
  private readonly SERVICE_NAME = "api";

  constructor(port = 3000) {
    this.port = port;

    this.server = this._setupExpressServer();
  }

  public run(): void {
    this.server.listen(this.port, () => {
      console.log(`Server is running at port ${this.port}`);
    });
  }

  private _setupExpressServer(): Application {
    const app = express();

    app.set("trust proxy", true);
    app.use(cookieParser(`${process.env.COOKIE_SECRET}`));
    app.use(CORS);
    app.use(bodyParser.json({ limit: "50mb" }));

    // Compress responses
    app.use(compression());

    // Get user agent of clients
    app.use(userAgent.express());

    app.get("/", (_req: Request, res: Response) => {
      res.status(200).send("Server is running... so stop bothering it");
    });

    useContainer(Container);

    let controllersExtName = "js";
    if (process.env.LOCAL_NODE_ENV === "true") {
      controllersExtName = "ts";
    }

    const server = useExpressServer(app, {
      routePrefix: `/${this.API_VERSION}/${this.SERVICE_NAME}`,
      controllers: [
        join(__dirname + `/domain/**/*.controller.${controllersExtName}`),
      ],
    });

    return server;
  }
}
