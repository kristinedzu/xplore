import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonList,
    IonListHeader,
    IonLabel,
    IonSlides,
    IonSlide,
    IonImg
} from "@ionic/react";
import { reload } from "ionicons/icons";
import { useHistory } from "react-router-dom";

export default function PostSlider({ post }) {
    const history = useHistory();

    function goToPostView() {
        history.push(`posts/${post.id}`);
    }

    function goToCityView() {
        history.push(`cities/${post.city.id}`);
    }

    const slideOpts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: "2.5"
      };
      
      const slide2Opts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 2.3,
      };

    return (
        <IonList>
            <IonListHeader onClick={goToCityView}>
                <IonLabel>{post.city.name}</IonLabel>
            </IonListHeader>
            <IonItem lines="none">
                <IonSlides options={slide2Opts}>
                
                    <IonSlide className='ion-slide'>
                        <IonCard onClick={goToPostView}>
                            <IonImg className="post-img" src={post.img} />
                        </IonCard>  
                    </IonSlide>
                
                </IonSlides>
          </IonItem>
        </IonList>
    );
}
