import React from 'react';

interface AudioControlsProps {
  onPlayPause: () => void;
  onStop: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
}

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1H8zm3 0a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1h-1z" clipRule="evenodd" />
    </svg>
);

const StopIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 8a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H10a2 2 0 01-2-2V8z" clipRule="evenodd" />
    </svg>
);


export const AudioControls: React.FC<AudioControlsProps> = ({ onPlayPause, onStop, isSpeaking, isPaused }) => {
  return (
    <div className="flex items-center justify-center space-x-6">
      <button
        onClick={onPlayPause}
        className="p-3 rounded-full bg-blue-600 text-white disabled:bg-gray-600 disabled:opacity-50 transition-all duration-200 ease-in-out hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-75"
        aria-label={!isSpeaking ? "Iniciar narração" : isPaused ? "Continuar narração" : "Pausar narração"}
      >
        {isSpeaking && !isPaused ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        onClick={onStop}
        disabled={!isSpeaking}
        className="p-3 rounded-full bg-red-600 text-white disabled:bg-gray-600 disabled:opacity-50 transition-all duration-200 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-75"
        aria-label="Parar narração"
      >
        <StopIcon />
      </button>
    </div>
  );
};
