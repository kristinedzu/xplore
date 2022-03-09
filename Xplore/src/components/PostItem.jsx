import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    IonItem
} from "@ionic/react";
import { useHistory } from "react-router-dom";


export default function PostListItem({ post }) {
    const history = useHistory();

    function goToCountryView() {
        history.push(`countries/${post.country.id}`);
    }

    return (
        <IonCard slot="start" onClick={goToCountryView}>
            <IonItem lines="none">
            </IonItem>
            <IonImg className="post-img" src={post.img} />
            <IonCardHeader>
                <IonCardTitle>
                    <h4>{post.city.name}, {post.country.name}</h4>
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{post.body}</IonCardContent>
        </IonCard>
    );
}
