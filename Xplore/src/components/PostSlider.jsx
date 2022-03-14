import {
    IonCard,
    IonSlide,
    IonImg
} from "@ionic/react";
import { useHistory } from "react-router-dom";

export default function PostSlider({ post }) {
    const history = useHistory();

    function goToPostView() {
        history.push(`posts/${post.id}`);
    }

    return (
        <IonSlide className='ion-slide'>
            <IonCard onClick={goToPostView}>
                <IonImg className="post-img" src={post.img} />
            </IonCard>  
        </IonSlide>
    );
}
