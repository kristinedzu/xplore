import {
    IonCard,
    IonCardContent,
    IonImg,
    IonChip,
    IonLabel,
    IonItem,
    IonAvatar
} from "@ionic/react";
import ReactStars from "react-rating-stars-component";


export default function PostListItem({ post }) {
    return (
        <IonCard>
            <IonImg className="post-img-profile" src={post.img} />
            <IonItem lines="none">
                <IonAvatar slot="start">
                    <IonImg src={post.user.profileImg} />
                </IonAvatar>
                <IonLabel>
                    <h2>{post.user.firstName}</h2>
                    <ReactStars
                        count={post.review}
                        size={18}
                        color="#ffd700"
                    />
                </IonLabel>
            </IonItem>
            <IonCardContent className="card-flex">
                <IonLabel>{post.body}</IonLabel>
            </IonCardContent>
        </IonCard>
    );
}
