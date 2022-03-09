import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonItem
} from "@ionic/react";
import { reload } from "ionicons/icons";
import { useHistory } from "react-router-dom";

export default function CityItem({ city }) {
    const history = useHistory();

    function goToCityView() {
        history.push(`cities/${city.id}`);
    }

    return (
        <IonCard onClick={goToCityView}>
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
