import {
    IonCard,
    IonSlide,
    IonImg
} from "@ionic/react";
import { useHistory } from "react-router-dom";

export default function PostSlider({ post }) {
    const history = useHistory();

    return (
        <IonSlide className='ion-slide' onClick={() => { history.push(`/posts/${post.id}`) }}>
            <IonCard>
                <IonImg className="post-img" src={post.img} />
            </IonCard>  
        </IonSlide>
    );
}
