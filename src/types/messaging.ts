
export type UserRole = "client" | "reviewer" | "admin";

export interface User {
  id: string;
  role: UserRole;
  name: string; // Required name
  avatar?: string; // Optional avatar
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  is_read?: boolean;
}

export interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    role: UserRole;
    avatar?: string;
  };
  lastMessage: {
    content: string;
    timestamp: Date;
    isRead: boolean;
  };
  applicationId?: string;
}

export interface Application {
  id: string;
  userId: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  companyName: string;
  financingAmount: number;
  submittedDate?: Date;
  documents?: Document[];
}

export interface Document {
  id: string;
  name: string;
  description?: string;
  filePath: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: Date;
}

export interface Payment {
  id: string;
  applicationId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  referenceId?: string;
  paymentMethod?: string;
  transactionDate: Date;
}

export interface Review {
  id: string;
  applicationId: string;
  reviewerId: string;
  status: 'pending' | 'in_progress' | 'completed';
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NDA {
  id: string;
  applicationId: string;
  filePath?: string;
  signedDate?: Date;
  status: 'pending' | 'signed';
}
