import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList } from '@ionic/react';
import { useEffect, useState } from "react";
import { postsRef } from "../firebase-config";
import { onValue } from "@firebase/database";
import CountryItem from "../components/CountryItem";

export default function AddNewPostPage() {
  const [countries, setCountries] = useState([]);

  async function getCountries() {
    const countriesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/countries.json`);
    const countriesData = await countriesRes.json();
    const countriesArray = Object.keys(countriesData).map(key => ({ id: key, ...countriesData[key]})); // from object to array

    setCountries(countriesArray);
  }

  useEffect(() => {
    getCountries();
  }, []);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add new post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add new post</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
              {countries.map(country =>  
                  <CountryItem country={country} key={country.id} />
              )}
      </IonList>
      </IonContent>
    </IonPage>
  );
};
