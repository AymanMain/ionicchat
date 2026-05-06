import React, { FC, useRef, useEffect } from "react";
import { IonList, IonItem } from "@ionic/react";
import { ChatMessage } from "../types/chat";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: ChatMessage[];
  onDelete: (id: string) => void;
}
// MessageList component
const MessageList: FC<MessageListProps> = ({ messages, onDelete }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="empty-hint" role="status">
        Aucun message. Dites bonjour ! 👋
      </div>
    );
  }

  return (
    <IonList
      lines="none"
      role="log"
      aria-live="polite"
      aria-label="Conversation"
      style={{ background: "transparent", padding: "8px 0" }}
    >
      {messages.map((msg) => (
        <IonItem
          key={msg.id}
          style={{
            "--background": "transparent",
            "--padding-start": "10px",
            "--padding-end": "10px",
            "--inner-padding-end": "0",
          }}
        >
          <MessageBubble msg={msg} onDelete={onDelete} />
        </IonItem>
      ))}
      <div ref={bottomRef} />
    </IonList>
  );
};

export default MessageList;
