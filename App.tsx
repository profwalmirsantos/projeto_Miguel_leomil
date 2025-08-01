
import React, { useState, useEffect, useCallback } from 'react';
import { STORY_DATA } from './story';
import type { Story } from './types';
import { useTextToSpeech } from './hooks/useTextToSpeech';
import { generateImage } from './services/geminiService';
import { AudioControls } from './components/AudioControls';
import { ChoiceButton } from './components/ChoiceButton';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [story] = useState<Story>(STORY_DATA);
  const [currentSceneId, setCurrentSceneId] = useState<string>('start');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { speak, cancel, isSpeaking, isPaused, togglePause } = useTextToSpeech();

  const currentScene = story[currentSceneId];

  const fetchAndSetImage = useCallback(async () => {
    if (currentScene && currentScene.imagePrompt) {
      setIsLoadingImage(true);
      setError(null);
      try {
        const b64Image = await generateImage(currentScene.imagePrompt);
        setImageUrl(`data:image/jpeg;base64,${b64Image}`);
      } catch (err: any) {
        console.error("Failed to generate image:", err);
        if (err.message === 'API_KEY_MISSING') {
            setError("Erro de Configuração: A chave da API do Google não foi fornecida. Para que este aplicativo funcione, ele precisa ser executado em um ambiente onde a chave da API esteja disponível.");
        } else {
            setError("Não foi possível carregar a imagem da cena. Por favor, continue com a história.");
        }
        setImageUrl(null);
      } finally {
        setIsLoadingImage(false);
      }
    } else {
      setImageUrl(null);
    }
  }, [currentScene]);

  useEffect(() => {
    cancel(); // Stop any previous speech
    setImageUrl(null); // Clear previous image

    if (currentScene) {
      // Speech is now initiated by user action, not automatically.
      fetchAndSetImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSceneId, story]);

  const handleChoice = (nextSceneId: string) => {
    if (story[nextSceneId]) {
      setCurrentSceneId(nextSceneId);
    }
  };

  const handlePrimaryAudioAction = useCallback(() => {
    if (isSpeaking) {
      togglePause();
    } else if (currentScene) {
      const textToRead = currentScene.text.join(' ');
      speak(textToRead, 'pt-BR');
    }
  }, [isSpeaking, togglePause, currentScene, speak]);

  if (!currentScene) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-3xl">
        <p>História não encontrada. Por favor, recarregue a página.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image Section */}
            <div className="relative aspect-square bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
              {isLoadingImage && <LoadingSpinner />}
              {error && !isLoadingImage && (
                <div className="p-4 text-center text-yellow-300 text-xl">
                  <p>{error}</p>
                </div>
              )}
              {imageUrl && !isLoadingImage && (
                <img src={imageUrl} alt={currentScene.imagePrompt} className="w-full h-full object-cover" />
              )}
               {!isLoadingImage && !imageUrl && !error && (
                 <div className="p-4 text-center text-gray-400">
                    <p>Uma imagem para esta cena aparecerá aqui.</p>
                </div>
               )}
            </div>

            {/* Text and Controls Section */}
            <div className="flex flex-col h-full">
              <div className="flex-grow overflow-y-auto pr-2">
                {currentScene.text.map((paragraph, index) => (
                  <p key={index} className="text-xl md:text-2xl lg:text-3xl leading-relaxed md:leading-loose mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-auto pt-6">
                 <AudioControls
                    onPlayPause={handlePrimaryAudioAction}
                    onStop={cancel}
                    isSpeaking={isSpeaking}
                    isPaused={isPaused}
                  />
                <div className="mt-6 space-y-4">
                  {currentScene.choices.map((choice, index) => (
                    <ChoiceButton
                      key={index}
                      text={choice.text}
                      onClick={() => handleChoice(choice.nextScene)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center mt-6 text-gray-500 text-sm">
        <p>Desenvolvido para uma experiência de aprendizagem acessível.</p>
      </footer>
    </div>
  );
};

export default App;
