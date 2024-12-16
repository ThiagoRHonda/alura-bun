// Importa a biblioteca do Google Gemini AI
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializa a API do Gemini com a chave da API armazenada em variáveis de ambiente
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configura o modelo específico do Gemini a ser usado (gemini-1.5-flash neste caso)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função principal que gera descrição de imagem usando o Gemini
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Define o prompt que será enviado ao modelo
  const prompt =
    "Gere uma descrição em português do brasil para a seguinte imagem";

  try {
    // Configura os dados da imagem para envio à API
    const image = {
      inlineData: {
        // Converte o buffer da imagem para base64
        data: imageBuffer.toString("base64"),
        // Especifica o tipo de mídia da imagem
        mimeType: "image/png",
      },
    };

    // Envia a requisição para o modelo com o prompt e a imagem
    const res = await model.generateContent([prompt, image]);

    // Extrai e retorna o texto da resposta, ou "alt-text não disponível" se vazio
    return res.response.text() || "alt-text não disponível.";
  } catch (erro) {
    // Log do erro no console para debugging
    console.error("Erro ao obter alt-text:", erro.message, erro);
    // Lança um erro personalizado
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}
