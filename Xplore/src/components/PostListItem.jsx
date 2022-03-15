import {
    IonCard,
    IonCardContent,
    IonImg,
    IonChip,
    IonLabel,
    IonItem,
    IonAvatar
} from "@ionic/react";


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
                    <p>{post.review}</p>
                </IonLabel>
            </IonItem>
            <IonCardContent className="card-flex">
                <IonLabel>{post.body}</IonLabel>
            </IonCardContent>
        </IonCard>
    );
}
