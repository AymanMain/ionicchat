import React, { FC } from "react";
import {
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonChip,
  IonLabel,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { ChatMessage } from "../types/chat";

interface MessageBubbleProps {
  msg: ChatMessage;
  onDelete: (id: string) => void;
}

const MessageBubble: FC<MessageBubbleProps> = ({ msg, onDelete }) => {
  const isMe = msg.sender === "me";

  const statusIcon =
    msg.status === "read" ? "✓✓" :
      msg.status === "delivered" ? "✓✓" : "✓";

  const statusColor =
    msg.status === "read" ? "#34b7f1" : "#aaa";

  return (
    <IonItemSliding style={{ width: "100%", background: "transparent" }}>
      {/* Swipe left → supprimer */}
      <IonItemOptions side="end" onIonSwipe={() => onDelete(msg.id)}>
        <IonItemOption color="danger" expandable onClick={() => onDelete(msg.id)}>
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>

      {/* Bulle */}
      <div
        style={{
          display: "flex",
          justifyContent: isMe ? "flex-end" : "flex-start",
          width: "100%",
          padding: "2px 0",
        }}
      >
        <div
          style={{
            maxWidth: "75%",
            background: isMe ? "#dcf8c6" : "#ffffff",
            borderRadius: isMe ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
            padding: "8px 10px 6px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
          }}
        >
          {msg.image && (
            <img
              src={msg.image}
              alt="photo envoyée"
              style={{ maxWidth: 220, maxHeight: 200, borderRadius: 8, display: "block", marginBottom: 4 }}
            />
          )}

          {msg.text && (
            <p style={{ margin: 0, fontSize: 14.5, color: "#111", lineHeight: 1.4 }}>
              {msg.text}
            </p>
          )}

          {msg.audio && (
            <audio
              controls
              src={msg.audio}
              style={{ width: 200, height: 32, marginTop: 4 }}
            />
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 4, marginTop: 3 }}>
            <span style={{ fontSize: 11, color: "#888" }}>{msg.createdAt}</span>
            {isMe && (
              <span style={{ fontSize: 12, color: statusColor }}>{statusIcon}</span>
            )}
          </div>
        </div>
      </div>
    </IonItemSliding>
  );
};

export default MessageBubble;
