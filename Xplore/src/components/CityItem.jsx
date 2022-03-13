import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonList,
    IonListHeader,
    IonLabel,
    IonMenuButton
} from "@ionic/react";
import { reload } from "ionicons/icons";
import { useHistory } from "react-router-dom";

export default function CityItem({ city }) {
    const history = useHistory();

    function goToCityView() {
        history.push(`cities/${city.id}`);
    }

    return (
        <IonList>
            <IonListHeader>
                <IonLabel>{city.name}</IonLabel>
            </IonListHeader>
        </IonList>
    );
}
