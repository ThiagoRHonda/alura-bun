import { Hono } from "hono";
import {
  getTodosPost,
  getPost,
  criarPost,
  atualizarPost,
  deletePost,
} from "../models/postmodels";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica o diretório para armazenar as imagens enviadas
    cb(null, "uploads/"); // Substitua por seu caminho de upload desejado
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo por simplicidade
    cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
  },
});

const upload = multer({ dest: "./uploads", storage });

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
  .post("/posts/mongodb/upload", async (c) => {
    const data = await c.req.formData();
    const file = data.get("imagem");
    const novoPost = {
      descricao: "",
      imgUrl: `http://localhost:3000/${file.name}`,
      alt: "",
    };
    console.log(novoPost);

    const buffer = await file.arrayBuffer();

    try {
      const postCriado = await criarPost(novoPost);
      fs.writeFileSync(
        `./uploads/${postCriado.insertedId}.jpeg`,
        Buffer.from(buffer)
      );
    } catch (error) {}
  })
  .post("/posts", async (c) => {
    let data = await c.req.json();
    await Bun.write("livros.json", JSON.stringify(data, null, 2));
    return c.json(data);
  })
  .delete("/posts/mongodb/:id", async (c) => {
    return c.json(await deletePost(c.req.param("id")));
  });
