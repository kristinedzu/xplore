import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList } from '@ionic/react';
import { useEffect, useState } from "react";
import { postsRef } from "../firebase-config";
import { onValue } from "@firebase/database";
import CityItem from "../components/CityItem";
import { useParams } from "react-router";


export default function CountryPage() {
  const [posts, setPosts] = useState([]);
  const [country, setCountry] = useState([]);
  const [cities, setCities] = useState([]);
  const params = useParams();
  const countryId = params.id;

//   async function getUsers() {
//     const response = await fetch("https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users.json");
//     const data = await response.json();
//     // mapp object into an array with objects
//     const users = Object.keys(data).map(key => ({ id: key, ...data[key] }));
//     return users;
//   }

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

    useEffect(() => {
        loadData();
    }, []);




  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{country.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{country.name}</IonTitle>
          </IonToolbar>
          
          <IonList>
           
              {cities.map(city =>  
                  <CityItem city={city} key={city.id} />
              )}
          </IonList>

        </IonHeader>
      </IonContent>
    </IonPage>
  );
};
