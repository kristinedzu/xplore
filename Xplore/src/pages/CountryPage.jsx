import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList } from '@ionic/react';
import { useEffect, useState } from "react";
import { postsRef } from "../firebase-config";
import { onValue } from "@firebase/database";
import CityItem from "../components/CityItem";
import { useParams } from "react-router";
import { useIonViewWillEnter } from "@ionic/react";


export default function CountryPage() {
  const [country, setCountry] = useState([]);
  const [cities, setCities] = useState([]);
  const params = useParams();
  const countryId = params.id;

  async function loadData() {
    //fetch country data by countryId prop
    const countryRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/countries/${countryId}.json`);
    const countryData = await countryRes.json();
    setCountry(countryData);

    // fetch cities where countryId is equal to countryId prop
    const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
    const citiesData = await citiesRes.json();
    const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key], country: countryData })); // from object to array
    const citiesArray = allCities.filter(city => city.countryId == countryId);
    setCities(citiesArray.reverse());
    }

    useIonViewWillEnter(() => {
      loadData();
    });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{country.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{country.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
              {cities.map(city =>  
                  <CityItem city={city} key={city.id} />
              )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
