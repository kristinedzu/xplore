import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    IonItem
} from "@ionic/react";

export default function PostListItem({ post }) {
    

    return (
        <IonCard>
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
