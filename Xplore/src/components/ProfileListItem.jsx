import {
    IonCard,
    IonCardContent,
    IonImg,
    IonChip,
    IonLabel,
    IonItem,
} from "@ionic/react";
import ReactStars from "react-rating-stars-component";


export default function PostListItem({ post }) {
    return (
        <IonCard>
            <IonImg className="post-img-profile" src={post.img} />
            <IonItem lines="none">
                <IonLabel>
                    <ReactStars
                        count={post.review}
                        size={18}
                        color="#ffd700"
                    />
                </IonLabel>
            </IonItem>
            <IonCardContent className="card-flex">
                <IonLabel>{post.body}</IonLabel>
                <IonChip>
                    <IonLabel>{post.city.name}</IonLabel>
                </IonChip>
            </IonCardContent>
        </IonCard>
    );
}
