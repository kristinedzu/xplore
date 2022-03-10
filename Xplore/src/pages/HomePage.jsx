import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonSearchbar,
  IonItem,
  IonAvatar,
  IonLabel,
  IonCard,
  IonImg,
  IonCardTitle,
  IonCardContent,
  IonButtons,
  IonButton
} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAuth, signOut } from "firebase/auth";

//import 'swiper/swiper.min.css';
import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';

export default function HomePage(){
  const auth = getAuth();
  function handleSignOut() {
    signOut(auth);
}
  const sliderData = [
    {
      title: "Piza",
      subtitle: "Piza tower",
      image: "https://images.pexels.com/photos/629142/pexels-photo-629142.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    },
    {
      title: "Bangkok",
      subtitle: "Bangkok during the dat",
      image: "https://images.pexels.com/photos/708764/pexels-photo-708764.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    },
    {
      title: "Yellowstone",
      subtitle: "Yellowstone",
      image: "https://images.pexels.com/photos/5464615/pexels-photo-5464615.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    },
    {
      title: "North Norway",
      subtitle: "Norway",
      image: "https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    }
  ];

  const sliderCitiesData = [
    {
      name: "New York"
    },
    {
      name: "Warsaw"
    },
    {
      name: "Aarhus"
    },
    {
      name: "Barcelona"
    }
  ];
  return (
    <IonPage>
      <IonHeader>
        <IonItem>
          <IonAvatar slot="end">
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
          </IonAvatar>
          <IonLabel>Hi User!</IonLabel>
        </IonItem>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Let's start your travel!</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar></IonSearchbar>
        <IonLabel>Cities worth visting</IonLabel>
        <Swiper spaceBetween={0} slidesPerView={2.25}>
          {sliderCitiesData.map((card, index) => {
            return (
              <SwiperSlide key={`slide_${index}`}>
                <IonCard>
                  <IonCardContent>
                    <IonCardTitle className='slider-card-title'>{card.name}</IonCardTitle>  
                  </IonCardContent>  
                </IonCard>  
              </SwiperSlide>
            )
          })}
        </Swiper>
        <IonLabel>Most popular destinations</IonLabel>
        <Swiper spaceBetween={0} slidesPerView={2.25}>
          {sliderData.map((card, index) => {
            return (
              <SwiperSlide key={`slide_${index}`}>
                <IonCard>
                  <IonImg src={card.image} alt="card" className='slider-img'/>
                  <IonCardContent>
                    <IonCardTitle className='slider-card-title'>{card.title}</IonCardTitle>  
                  </IonCardContent>  
                </IonCard>  
              </SwiperSlide>
            )
          })}
        </Swiper>
        <IonButtons>
          <IonButton onClick={handleSignOut}>Sign Out</IonButton>
        </IonButtons>
      </IonContent>
    </IonPage>
  );
};
