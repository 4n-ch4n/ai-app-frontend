export interface Message {
  text: string;
  isAI: boolean;
  info?: Info
}

export interface Info {
  userScore: number;
  errors: string[];
  message: string;
}
