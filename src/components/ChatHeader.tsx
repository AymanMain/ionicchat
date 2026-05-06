import React, { FC } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { Contact } from "../types/chat";

interface ChatHeaderProps {
  contact: Contact;
}

const ChatHeader: FC<ChatHeaderProps> = ({ contact }) => (
  <IonHeader>
    <IonToolbar color="primary">
      <IonButtons slot="start">
        <IonBackButton defaultHref="/" text="" />
      </IonButtons>

      <IonButtons slot="start">
        <IonAvatar style={{ width: 36, height: 36, margin: "0 6px" }}>
          {contact.avatar ? (
            <img src={contact.avatar} alt={contact.name} />
          ) : (
            <div className="avatar-fallback">{contact.name[0].toUpperCase()}</div>
          )}
        </IonAvatar>
      </IonButtons>

      <IonTitle>
        <IonLabel>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{contact.name}</h2>
          <p style={{ fontSize: 12, opacity: 0.85, margin: 0 }}>
            {contact.online ? "En ligne" : "Hors ligne"}
          </p>
        </IonLabel>
      </IonTitle>

      <IonButtons slot="end">
        <IonButton aria-label="Menu">
          <IonIcon icon={ellipsisVertical} slot="icon-only" />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
);

export default ChatHeader;
