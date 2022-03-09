import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList } from '@ionic/react';
import { useState } from "react";
import { useIonViewWillEnter } from "@ionic/react";
import { postsRef } from "../firebase-config";
import { onValue } from "@firebase/database";
import { useParams } from "react-router";


export default function CityPage() {
  const [posts, setPosts] = useState([]);
  const [city, setCity] = useState([]);
  const params = useParams();
  const cityId = params.id;

  async function loadCity() {
    //fetch country data by countryId prop
    const cityRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities/${cityId}.json`);
    const cityData = await cityRes.json();
    setCity(cityData);
  }

    useIonViewWillEnter(() => {
      loadCity();
    });




  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{city.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{city.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        
      </IonContent>
    </IonPage>
  );
};
