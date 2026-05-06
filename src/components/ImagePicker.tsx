import React, { FC, useRef, ChangeEvent } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { camera } from "ionicons/icons";

interface ImagePickerProps {
  onImageReady: (dataUrl: string) => void;
}

const ImagePicker: FC<ImagePickerProps> = ({ onImageReady }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) onImageReady(ev.target.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <>
      <IonButton
        fill="clear"
        color="medium"
        onClick={() => inputRef.current?.click()}
        aria-label="Choisir une photo"
      >
        <IonIcon slot="icon-only" icon={camera} />
      </IonButton>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleFile}
        aria-hidden="true"
      />
    </>
  );
};

export default ImagePicker;
