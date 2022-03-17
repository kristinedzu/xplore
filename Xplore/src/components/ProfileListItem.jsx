import {
    IonCard,
    IonCardContent,
    IonImg,
    IonChip,
    IonLabel,
    IonItem,
} from "@ionic/react";
import ReactStars from "react-rating-stars-component";


export default function ProfileListItem({ post }) {
    return (
        <IonCard>
            <IonImg className="post-img-profile" src={post.img} />
            <IonCardContent className="card-flex">
                <IonLabel>{post.body}</IonLabel>
                <IonItem className="profile-list-item" color="none" lines="none">
                    <IonChip>
                        <IonLabel>{post.city.name}</IonLabel>
                    </IonChip>
                    <IonLabel className="profile-stars">
                        <ReactStars
                            count={post.review}
                            size={18}
                            color="#ffd700"
                        />
                    </IonLabel>
                </IonItem>
            </IonCardContent>
        </IonCard>
    );
}
