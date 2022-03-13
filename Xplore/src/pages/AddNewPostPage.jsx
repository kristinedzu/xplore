import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonLabel, IonTextarea, IonItem, IonSelect, IonSelectOption, IonButton} from '@ionic/react';
import { useEffect, useState } from "react";
// import { postsRef } from "../firebase-config";
// import { onValue } from "@firebase/database";
// import CountryItem from "../components/CountryItem";

export default function AddNewPostPage() {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [text, setText] = useState();

  async function getCountries() {
    const countriesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/countries.json`);
    const countriesData = await countriesRes.json();
    const countriesArray = Object.keys(countriesData).map(key => ({ id: key, ...countriesData[key]})); // from object to array
    setCountries(countriesArray);

    const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
    const citiesData = await citiesRes.json();
    const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key], country: countriesArray })); // from object to array
    const citiesArray = allCities.filter(city => city.countryId === country.id);
    setCities(citiesArray);
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
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add new post</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem className="input-item">
            <IonLabel position="floating">Country</IonLabel>
            <IonSelect value={country} placeholder="Select Country" onIonChange={e => setCountry(e.detail.value)}>
                {countries.map(country =>  
                    <IonSelectOption key={country.id} value={country}>{country.name}</IonSelectOption>
                )}
            </IonSelect>
          </IonItem>
          <IonItem className="input-item">
            <IonLabel position="floating">City</IonLabel>
            <IonSelect value={city} placeholder="Select City" onIonFocus={getCountries} onIonChange={e => setCity(e.detail.value)}>
                {cities.map(city =>  
                    <IonSelectOption key={city.id} value={city}>{city.name}</IonSelectOption>
                )}
            </IonSelect>
          </IonItem>          
          <IonItem className="input-item">
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea value={text} placeholder="Your review destinations" onIonChange={e => setText(e.detail.value)}></IonTextarea>
          </IonItem>
          <IonButton expand="block">Add</IonButton>
        </IonList>
        
        {/* <IonList>
              {countries.map(country =>  
                  <CountryItem country={country} key={country.id} />
              )}
        </IonList> */}
      </IonContent>
    </IonPage>
  );
};
