
export type UserRole = "client" | "reviewer" | "admin";

export interface User {
  id: string;
  role: UserRole;
  name?: string;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    role: UserRole;
  };
  lastMessage: {
    content: string;
    timestamp: Date;
    isRead: boolean;
  };
  applicationId?: string;
}
