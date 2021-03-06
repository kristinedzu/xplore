import {
    IonCard,
    IonCardContent,
    IonImg,
    IonChip,
    IonLabel,
    IonItem,
    IonAvatar
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";


export default function PostListItem({ post }) {
    const history = useHistory();

    function goToPostDetails() {
        history.push(`/posts/${post.id}`);
    }
    return (
        <IonCard onClick={goToPostDetails}>
            <IonImg className="post-img-profile" src={post.img} />
            <IonCardContent className="card-flex">
                <IonLabel>{post.body}</IonLabel>
                <IonItem lines="none" color="none" className="post-list-item">
                    <IonAvatar slot="start">
                    {post.user?.profileImg ? <IonImg src={post.user?.profileImg} /> : <IonImg src="../assets/profile-placeholder-small.png" />}
                    </IonAvatar>
                    <IonLabel>
                        <h2>{post.user?.firstName}</h2>
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
