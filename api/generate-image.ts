import { GoogleGenerativeAI } from "@google/generative-ai";

// Esta é uma Função de Borda (Edge Function), que é o padrão em plataformas modernas
// como Vercel ou Netlify. Ela é executada em um ambiente de servidor seguro.
export const config = {
  runtime: 'edge',
};

// O manipulador de solicitações da API.
export default async function handler(req: Request) {
  // 1. Verifique se a chave da API está disponível no ambiente do servidor.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "A chave da API não está configurada no servidor." }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 2. Extraia o prompt da solicitação recebida do frontend.
  let prompt;
  try {
    const body = await req.json();
    prompt = body.prompt;
    if (!prompt) {
      throw new Error("O prompt é obrigatório.");
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Corpo da solicitação inválido ou prompt ausente." }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 3. Inicialize o cliente Gemini com a chave segura e chame a API.
  try {
    import { GoogleGenerativeAI } from "@google/generative-ai";
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: `${prompt}. Estilo de pintura digital, dramático, cinematográfico.`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      // 4. Envie a imagem de volta para o frontend.
      return new Response(JSON.stringify({ image: base64ImageBytes }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error("Nenhuma imagem foi gerada pela API.");
    }
  } catch (error: any) {
    console.error("Erro ao gerar imagem com Gemini:", error);
    return new Response(
      JSON.stringify({ error: "O serviço de geração de imagem falhou." }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}