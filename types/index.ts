export interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  images: string[];
}

export interface Message {
  id: number;
  sender: 'You' | string;
  text: string;
  timestamp: Date;
}

export interface ChatConversation {
  profileId: number;
  messages: Message[];
}