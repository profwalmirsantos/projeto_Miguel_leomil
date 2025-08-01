
export interface Choice {
  text: string;
  nextScene: string;
}

export interface Scene {
  id: string;
  text: string[];
  imagePrompt: string;
  choices: Choice[];
  isEnd?: boolean;
}

export type Story = Record<string, Scene>;
