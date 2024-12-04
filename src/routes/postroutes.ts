import { Hono } from "hono";
import {
  getTodosPost,
  getPost,
  criarPost,
  atualizarPost,
} from "../models/postmodels";
//import multer from "multer";

export const rotas = new Hono()
  .get("/", (c) => c.text("Hello Bun!"))
  .get("/posts", async (c) => {
    return c.json(JSON.parse(await Bun.file("livros.json").text()));
  })
  .get("/posts/mongodb", async (c) => {
    //const posts = await getTodosPost();
    return c.json(await getTodosPost());
  })
  .get("/posts/mongodb/:id", async (c) => {
    return c.json(await getPost(c.req.param("id")));
  })
  .post("/posts/mongodb", async (c) => {
    try {
      const body = await c.req.json();
      await criarPost(body);
      return c.json({ message: "Data inserted successfully" });
    } catch (error) {
      console.error(error);
      //res.status(500).json({ Erro: "Erro ao criar o post" });
    }
  })
  .post("/posts", async (c) => {
    let data = await c.req.json();
    await Bun.write("livros.json", JSON.stringify(data, null, 2));
    return c.json(data);
  });
