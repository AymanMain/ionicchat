import React from 'react';
import { IonInput, IonItem, IonList } from '@ionic/react';

function InputComponent() {
    return (
        <IonList>
            <IonItem>
                <IonInput label="Default input"></IonInput>
            </IonItem>

            <IonItem>
                <IonInput label="Input with placeholder" placeholder="Enter company name"></IonInput>
            </IonItem>


        </IonList>
    );
}
export default InputComponent;
