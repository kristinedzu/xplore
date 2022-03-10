import {
    IonCard,
    IonCardContent,
    IonImg
} from "@ionic/react";


export default function PostListItem({ post }) {
    return (
        <IonCard>
            <IonImg src={post.img} />
            <IonCardContent>{post.body}</IonCardContent>
        </IonCard>
    );
}
