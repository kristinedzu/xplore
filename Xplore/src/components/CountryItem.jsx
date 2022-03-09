import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    IonItem
} from "@ionic/react";
import { useHistory } from "react-router-dom";

export default function CountryItem({ country }) {
    const history = useHistory();

    function goToCountryView() {
        history.push(`countries/${country.id}`);
    }


    return (
        <IonCard onClick={goToCountryView}>
            <IonItem lines="none">
            </IonItem>
            <IonImg className="post-img" src={country.img} />
            <IonCardHeader>
                <IonCardTitle>
                    <h4>{country.name}</h4>
                </IonCardTitle>
            </IonCardHeader>
        </IonCard>
    );
}
