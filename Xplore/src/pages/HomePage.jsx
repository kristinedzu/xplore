import React from 'react';
import 
{IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonItem, IonAvatar, IonLabel, IonCard, IonImg, IonCardTitle,IonCardContent, IonList, IonListHeader, IonButtons, IonButton} from '@ionic/react';
import { IonSlides, IonSlide, useIonViewWillEnter } from '@ionic/react';
import { useEffect, useState } from "react";
import CountryItem from "../components/CountryItem";
import { getAuth, signOut } from "firebase/auth";


export default function HomePage(){
  const [user, setUser] = useState([]);
  const auth = getAuth();
  let activeUser = auth.currentUser;

  function signOutUser() {
    signOut(auth);
  }
  const [countries, setCountries] = useState([]);

  async function getCountries() {
    const countriesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/countries.json`);
    const countriesData = await countriesRes.json();
    const countriesArray = Object.keys(countriesData).map(key => ({ id: key, ...countriesData[key]})); // from object to array

    setCountries(countriesArray);
  }

  async function getUserName() {
    const userRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users/${activeUser.uid}.json`);
    const userData = await userRes.json();
    console.log(userData);
    setUser(userData);
  }


  useEffect(() => {
    getCountries();
  }, []);

  useIonViewWillEnter(() => {
    getUserName();
  });

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
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonHeader>
          <IonItem lines="none">
            <IonAvatar slot="end">
              <IonImg src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar>
            <IonLabel>Hi {user.firstName}!</IonLabel>
          </IonItem>
        </IonHeader>
        <IonHeader collapse="condense">
          <IonToolbar className='title-toolbar'>
            <IonTitle size="large" className='home-page-title'>Let's start your travel!</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar animated></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonListHeader>
            <IonLabel>Cities worth visting</IonLabel>
          </IonListHeader>
          <IonItem lines="none">
            <IonSlides options={slideOpts}>
              {sliderCitiesData.map((card, index) => {
                return (
                  <IonSlide className='ion-slide' key={`slide_${index}`}>
                    <IonCard className='cities-card'>
                      <IonCardContent>
                        <IonCardTitle className='slider-card-title'>{card.name}</IonCardTitle>  
                      </IonCardContent>  
                    </IonCard>  
                  </IonSlide>
                )
              })}
            </IonSlides>
          </IonItem>
          <IonListHeader>
            <IonLabel>Most popular destinations</IonLabel>
          </IonListHeader>
          <IonItem lines="none">
            <IonSlides options={slide2Opts}>
            {countries.map((country, index) => {
              return (
                <IonSlide className='ion-slide' key={`slide_${index}`}>
                  <CountryItem country={country} key={country.id} />  
                </IonSlide>
              )
            })}
            </IonSlides>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonButtons>
              <IonButton onClick={signOutUser}>Sign Out</IonButton>
            </IonButtons>
          </IonItem>
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};
