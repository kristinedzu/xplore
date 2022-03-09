import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonItem
} from "@ionic/react";

export default function CityItem({ city }) {

    return (
        <IonCard>
            <IonItem lines="none">
            </IonItem>
            <IonCardHeader>
                <IonCardTitle>
                    <h4>{city.name}</h4>
                </IonCardTitle>
            </IonCardHeader>
        </IonCard>
    );
}
