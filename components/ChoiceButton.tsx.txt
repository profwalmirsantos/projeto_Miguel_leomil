
import React from 'react';

interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-6 bg-gray-700 hover:bg-indigo-600 focus:bg-indigo-700 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-75"
    >
      <span className="text-xl md:text-2xl font-semibold text-white">
        {text}
      </span>
    </button>
  );
};
