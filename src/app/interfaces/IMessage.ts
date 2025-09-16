export interface Message {
  text: string;
  isAI: boolean;
  info?: Info;
  audioUrl?: string;
}

export interface Info {
  userScore: number;
  errors: string[];
  message: string;
}
