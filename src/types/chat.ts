export type MessageStatus = "sent" | "delivered" | "read";
export type MessageSender = "me" | "contact";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  senderName: string;
  text?: string;
  image?: string;
  audio?: string;
  status: MessageStatus;
  createdAt: string;
}

export interface Contact {
  name: string;
  online: boolean;
  avatar?: string;
}

export interface SendPayload {
  text?: string;
  image?: string;
  audio?: string;
}
