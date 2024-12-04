import { ObjectId } from "mongodb";
import conectarAoBancoDeDados from "../config/dbconfig";

const conexao = await conectarAoBancoDeDados(Bun.env.STRING_CONEXAO);

export async function getTodosPost() {
  return conexao.db("imersao-instabytes").collection("posts").find().toArray();
}

export async function getPost(id: string) {
  const objId = ObjectId.createFromHexString(id);
  return conexao
    .db("imersao-instabytes")
    .collection("posts")
    .find({ _id: new ObjectId(objId) })
    .toArray();
}

export async function criarPost(novopost: any) {
  return conexao
    .db("imersao-instabytes")
    .collection("posts")
    .insertOne(novopost);
}

export async function atualizarPost(id: string, novopost: any) {
  const objId = ObjectId.createFromHexString(id);
  return conexao
    .db("imersao-instabytes")
    .collection("posts")
    .updateOne({ _id: new ObjectId(objId) }, { $set: novopost });
}
