export type ChatSender = 'user' | 'assistant';

export interface ChatPackage {
  id: string;
  title: string;
  country: string;
  region: string;
  startingPrice: string;
  nights: number;
  image: string;
  bestSeason?: string;
}

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  timestamp: string;
  relevantPackages?: ChatPackage[];
  suggestedQuestions?: string[];
  error?: boolean;
}

export interface ChatState {
  isOpen: boolean;
  isMinimized: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  activeSuggestions: string[];
  hasUnread: boolean;
}
