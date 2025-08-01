/**
 * Gera uma imagem chamando nosso endpoint de API de backend seguro.
 * @param prompt O prompt de texto para gerar uma imagem.
 * @returns Uma promessa que resolve para a string da imagem codificada em base64.
 */
export const generateImage = async (prompt: string): Promise<string> => {
  try {
    // Chame nosso próprio backend em vez da API do Google.
    // O navegador fará uma solicitação para '/api/generate-image'.
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        // Tenta ler o erro do corpo da resposta do nosso backend.
        const errorData = await response.json().catch(() => ({ error: "Ocorreu um erro desconhecido no servidor." }));
        // Se a chave da API estiver faltando no servidor, o erro virá daqui.
        if(response.status === 500 && errorData.error?.includes("API key is not configured")){
             throw new Error("API_KEY_MISSING");
        }
        throw new Error(errorData.error || `Erro do servidor: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.image) {
      return data.image;
    } else {
      throw new Error("Nenhuma imagem foi recebida do servidor.");
    }
  } catch (error) {
    console.error("Erro ao chamar o serviço de imagem:", error);
    // Propague o erro para que a UI possa exibi-lo.
    // Mantenha a mensagem de erro específica para a chave de API para uma melhor UX.
    if (error instanceof Error && error.message === 'API_KEY_MISSING') {
        throw error;
    }
    throw new Error("O serviço de geração de imagem falhou.");
  }
};
