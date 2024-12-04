import { MongoClient } from "mongodb";

export default async function connectToDatabase(stringConexao: any) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(stringConexao);
    console.log("Conectando ao MongoDB...");
    await mongoClient.connect();
    console.log("Conectado ao MongoDB Atlas com sucesso...");
    return mongoClient;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB Atlas:", error);
    process.exit();
  }
}
