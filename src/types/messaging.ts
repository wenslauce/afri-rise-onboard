
export type UserRole = "client" | "reviewer" | "admin";

export interface User {
  id: string;
  role: UserRole;
  name: string; // Making name required instead of optional
  avatar?: string; // Adding avatar as optional for UI purposes
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
