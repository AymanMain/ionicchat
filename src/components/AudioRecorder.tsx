import React, { FC, useState, useRef } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { mic, stop, send, close } from "ionicons/icons";

interface AudioRecorderProps {
  onAudioReady: (url: string) => void;
}

const AudioRecorder: FC<AudioRecorderProps> = ({ onAudioReady }) => {
  const [recording, setRecording] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e: BlobEvent) => chunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setPreview(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      mediaRef.current = mr;
      setRecording(true);
    } catch {
      alert("Microphone non disponible ou permission refusée.");
    }
  };

  const stopRecording = (): void => {
    mediaRef.current?.stop();
    setRecording(false);
  };

  const sendAudio = (): void => {
    if (preview) { onAudioReady(preview); setPreview(null); }
  };

  const cancelAudio = (): void => setPreview(null);

  if (preview) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <audio controls src={preview} style={{ height: 32, maxWidth: 160 }} />
        <IonButton fill="clear" color="success" onClick={sendAudio} aria-label="Envoyer l'audio">
          <IonIcon slot="icon-only" icon={send} />
        </IonButton>
        <IonButton fill="clear" color="danger" onClick={cancelAudio} aria-label="Annuler">
          <IonIcon slot="icon-only" icon={close} />
        </IonButton>
      </div>
    );
  }

  if (recording) {
    return (
      <IonButton fill="clear" color="danger" onClick={stopRecording} aria-label="Arrêter l'enregistrement"
        style={{ animation: "pulse 1s infinite" }}>
        <IonIcon slot="icon-only" icon={stop} />
      </IonButton>
    );
  }

  return (
    <IonButton fill="clear" color="medium" onClick={startRecording} aria-label="Message vocal">
      <IonIcon slot="icon-only" icon={mic} />
    </IonButton>
  );
};

export default AudioRecorder;
