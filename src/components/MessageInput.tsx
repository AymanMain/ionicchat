import React, { FC, useState, KeyboardEvent } from "react";
import {
  IonFooter,
  IonToolbar,
  IonInput,
  IonButton,
  IonIcon,
  IonThumbnail,
} from "@ionic/react";
import { send, close } from "ionicons/icons";
import { SendPayload } from "../types/chat";
import ImagePicker from "./ImagePicker";
import AudioRecorder from "./AudioRecorder";

interface MessageInputProps {
  onSend: (payload: SendPayload) => void;
}

const MessageInput: FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  const canSend = text.trim().length > 0 || image !== null;

  const send_msg = (): void => {
    if (!canSend) return;
    onSend({
      text: text.trim() || undefined,
      image: image ?? undefined,
    });
    setText("");
    setImage(null);
  };

  const handleKey = (e: KeyboardEvent<HTMLIonInputElement>): void => {
    if (e.key === "Enter") send_msg();
  };

  return (
    <IonFooter>
      {/* Aperçu image */}
      {image && (
        <IonToolbar style={{ "--background": "#f0f0f0", "--min-height": "72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px" }}>
            <IonThumbnail style={{ "--size": "56px", borderRadius: 8, overflow: "hidden" }}>
              <img src={image} alt="Aperçu" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </IonThumbnail>
            <IonButton fill="clear" color="danger" onClick={() => setImage(null)} aria-label="Supprimer photo">
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </div>
        </IonToolbar>
      )}

      {/* Barre de saisie */}
      <IonToolbar style={{ "--background": "#f0f0f0", "--min-height": "56px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px" }}>

          <ImagePicker onImageReady={setImage} />

          <IonInput
            value={text}
            placeholder="Digite uma mensagem"
            onIonInput={(e) => setText(e.detail.value ?? "")}
            onKeyDown={handleKey}
            aria-label="Message"
            style={{
              "--background": "#fff",
              "--border-radius": "20px",
              "--padding-start": "14px",
              "--padding-end": "14px",
              "--padding-top": "8px",
              "--padding-bottom": "8px",
              fontSize: 15,
              flex: 1,
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          />

          <AudioRecorder onAudioReady={(url) => onSend({ audio: url })} />

          {canSend && (
            <IonButton
              shape="round"
              color="success"
              onClick={send_msg}
              aria-label="Envoyer"
              style={{ "--padding-start": "12px", "--padding-end": "12px", width: 44, height: 44 }}
            >
              <IonIcon slot="icon-only" icon={send} />
            </IonButton>
          )}
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default MessageInput;
