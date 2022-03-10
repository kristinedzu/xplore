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
            <IonImg className="post-img" src={country.img} />
            <IonCardHeader className="post-header">
                <IonCardTitle className="post-title">
                    <h4>{country.name}</h4>
                </IonCardTitle>
            </IonCardHeader>
        </IonCard>
    );
}
