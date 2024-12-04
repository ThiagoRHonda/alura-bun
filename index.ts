import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { rotas } from "./src/routes/postroutes";

const app = new Hono();
app.use("uploads", serveStatic({ path: "./uploads" }));
console.log("Servidor Escutando...");

app.route("/", rotas);

export default {
  port: Bun.env.PORT,
  fetch: app.fetch,
};
