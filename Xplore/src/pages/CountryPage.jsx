import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonLabel, IonItem, IonSlides, IonBackButton, IonButtons } from '@ionic/react';
import { useEffect, useState } from "react";
import { postsRef } from "../firebase-config";
import { onValue } from "@firebase/database";
import CityItem from "../components/CityItem";
import PostSlider from "../components/PostSlider";
import { useParams } from "react-router";
import { useIonViewWillEnter } from "@ionic/react";
import { useHistory } from "react-router-dom";



export default function CountryPage() {
  const [posts, setPosts] = useState([]);
  const [country, setCountry] = useState([]);
  const [cities, setCities] = useState([]);
  const params = useParams();
  const countryId = params.id;
  const history = useHistory();

  const slide2Opts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.1,
    };


  async function loadData() {
    //fetch country data by countryId prop
    const countryRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/countries/${countryId}.json`);
    const countryData = await countryRes.json();
    setCountry(countryData);
  

 
    // fetch cities where countryId is equal to countryId prop
    const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
    const citiesData = await citiesRes.json();
    const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key]})); // from object to array
    const citiesArray = allCities.filter(city => city.countryId == countryId);
    setCities(citiesArray); 
  }
  console.log(cities);

  useIonViewWillEnter(() => {
    loadData();
    async function listenOnChange() {
      onValue(postsRef, async snapshot => {
          const postsArray = [];
          snapshot.forEach(postSnapshot => {
              const id = postSnapshot.key;
              const data = postSnapshot.val();

              const post = {
                  id,
                  ...data
              };
              postsArray.push(post);
              
          });
          setPosts(postsArray.reverse()); // newest post first
      });
    }
    listenOnChange();
  }, []);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
          <IonTitle>{country.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{country.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        {cities?.map(city => city &&
        <IonList>
          <IonListHeader city={city} key={city.id}>
            <IonLabel onClick={() => { history.push(`cities/${city.id}`) }}>{city.name}</IonLabel>
          </IonListHeader>
          <IonItem lines="none">
            <IonSlides options={slide2Opts}>
              {posts?.filter(cityPost => cityPost.cityId == city.id)
              .map(post => post &&
                <PostSlider post={post} key={post.id} />
              )}
            </IonSlides>
          </IonItem>
        </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};
