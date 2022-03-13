import {
    IonCard,
    IonCardContent,
    IonImg,
    IonChip,
    IonLabel,
    IonItem
} from "@ionic/react";


export default function PostListItem({ post }) {
    return (
        <IonCard>
            <IonImg className="post-img-profile" src={post.img} />
            <IonCardContent className="card-flex">
                <IonLabel>{post.body}</IonLabel>
                <IonChip>
                    <IonLabel>{post.city.name}</IonLabel>
                </IonChip>
            </IonCardContent>
        </IonCard>
    );
}
