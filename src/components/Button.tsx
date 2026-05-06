import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

function AddButton() {
    return (
        <IonFab>
            <IonFabButton>
                <IonIcon icon={add}></IonIcon>
            </IonFabButton>
        </IonFab>
    );
}
export default AddButton;