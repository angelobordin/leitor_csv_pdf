import { App } from "./app";
const port = process.env.PORT || 8090;
const app = new App(port);
app.listen();
