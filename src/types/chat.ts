export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
}

export interface User {
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface ChatApiResponse {
  response: string;
}

export interface ChatApiError {
  error: string;
}