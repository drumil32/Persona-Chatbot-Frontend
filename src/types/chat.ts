export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface User {
  name: string;
  avatar: string;
  isOnline: boolean;
}