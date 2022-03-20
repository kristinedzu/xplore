import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonLabel, IonItem, IonSlides, IonBackButton, IonButtons, IonImg, IonItemGroup, IonCard, IonCardHeader } from '@ionic/react';
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

  async function getPosts() {
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

  async function loadData() {
    getPosts();
    //fetch country data by countryId prop
    const countryRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/countries/${countryId}.json`);
    const countryData = await countryRes.json();
    setCountry(countryData);

    const postRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/posts.json`);
    const postData = await postRes.json();
    const allPosts = Object.keys(postData).map(key => ({ id: key, ...postData[key], })); // from object to array

 
    // fetch cities where countryId is equal to countryId prop
    const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
    const citiesData = await citiesRes.json();
    const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key]})); // from object to array
    const citiesArray = allCities.filter(city => city.countryId == countryId);

    // check if cities have any posts
    const result = citiesArray.map((city) => ({
    data: city,
    match: allPosts.some((post) => post.cityId === city.id)
    })).filter(res => res.match == true);
    const citiesWithPosts = result.map(res => res.data);

    if(result.length != 0) {
      setCities(citiesWithPosts); 
    }
  }

  useIonViewWillEnter(() => {
    loadData();
  }, []);


  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen class="ion-padding country-content">
      <IonItemGroup class="header-photo">
        <IonImg class="fullscreen-img" src={country.img}></IonImg>
      </IonItemGroup>

        <IonCard class="country-header">
          <IonCardHeader className='country-card-header'>{country.name}</IonCardHeader>
        </IonCard>

        <IonItemGroup class="country-content">
        {cities?.map(city => city &&
        <IonList >
          <IonListHeader city={city} key={city.id}>
            <IonLabel>{city.name}</IonLabel>
            <IonButtons lines="none" class="see-all-button" onClick={() => { history.push(`/cities/${city.id}`) }}>See all</IonButtons>
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
        </IonItemGroup>
      </IonContent>
    </IonPage>
  );
};
