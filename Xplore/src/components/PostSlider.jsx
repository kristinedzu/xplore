import {
    IonCard,
    IonSlide,
    IonImg
} from "@ionic/react";

export default function PostSlider({ post }) {

    return (
        <IonSlide className='ion-slide'>
            <IonCard>
                <IonImg className="post-img" src={post.img} />
            </IonCard>  
        </IonSlide>
    );
}
