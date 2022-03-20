import React from 'react';
import 
{IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonItem, IonAvatar, IonLabel, IonCard, IonImg, IonCardTitle,IonCardContent, IonList, IonListHeader, useIonLoading } from '@ionic/react';
import { IonSlides, IonSlide, useIonViewWillEnter } from '@ionic/react';
import { useEffect, useState } from "react";
import CountryItem from "../components/CountryItem";
import { getAuth} from "firebase/auth";
import { useHistory } from "react-router-dom";
import { get, onValue } from "@firebase/database";
import { getUserRef, countriesRef, postsRef, citiesRef } from "../firebase-config";

export default function HomePage(){
  const [user, setUser] = useState([]);
  //const [placeholder, setPlaceholder] = useState("");
  //console.log(placeholder);
  const [showLoader, dismissLoader] = useIonLoading();
  const auth = getAuth();
  let activeUser = auth.currentUser;

  
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cities, setCities] = useState([]);
  const [posts, setPosts] = useState([]);
  const [firstName, setFirstName] = useState();
  const [profileImg, setProfileImg] = useState();
  const history = useHistory();

  // // countries with posts
  // const result = countries.map((country) => ({
  //   data: country,
  //   match: posts.some((post) => post.countryId === country.id)
  // })).filter(res => res.match == true);


  async function getCountries() {
    // const postsArray = await getPosts();
    // const postRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/posts.json`);
    // const postData = await postRes.json();
    // const allPosts = Object.keys(postData).map(key => ({ id: key, ...postData[key] })); // from object to array

    // const countriesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/countries.json`);
    // const countriesData = await countriesRes.json();
    // const allCountries = Object.keys(countriesData).map(key => ({ id: key, ...countriesData[key]})); // from object to array

    // // check if countries have any posts
    // const result = allCountries.map((country) => ({
    //   data: country,
    //   match: allPosts.some((post) => post.countryId === country.id)
    //   })).filter(res => res.match == true);
    //   const countriesWithPosts = result.map(res => res.data);
    //   console.log(countriesWithPosts);
  
    //   if(result.length != 0) {
    //     setCountries(countriesWithPosts);
    //   }

      onValue(countriesRef, async snapshot => {
          const countriesArray = [];
          snapshot.forEach(postSnapshot => {
            const id = postSnapshot.key;
            const data = postSnapshot.val();
  
            const country = {
                id,
                ...data
            };

            countriesArray.push(country);
          });
          setCountries(countriesArray);
      });
  }

  async function getCities() {
    // const postRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/posts.json`);
    // const postData = await postRes.json();
    // const allPosts = Object.keys(postData).map(key => ({ id: key, ...postData[key], })); // from object to array

    // const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
    // const citiesData = await citiesRes.json();
    // const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key]})); // from object to array
    // // const citiesArray = allCities.filter(city => city.posts != undefined);

    //  // check if cities have any posts
    //  const result = allCities.map((city) => ({
    //   data: city,
    //   match: allPosts.some((post) => post.cityId === city.id)
    //   })).filter(res => res.match == true);
    //   const citiesWithPosts = result.map(res => res.data);
    //   console.log(citiesWithPosts);
  
    //   if(result.length != 0) {
    //     setCities(citiesWithPosts);
    //   }


    onValue(citiesRef, async snapshot => {
      const citiesArray= [];
      snapshot.forEach(postSnapshot => {
        const id = postSnapshot.key;
        const data = postSnapshot.val();
        const city = {
            id,
            ...data
        };
        citiesArray.push(city);
      });
      setCities(citiesArray);
    });
  }

  async function getUserName() {
    const userRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users/${user.uid}.json`);
    const userData = await userRes.json();
    setUser(userData);
  }

  useEffect(() => {
    setUser(activeUser);

    async function getUserDataFromDB() {
      const snapshot = await get(getUserRef(user.uid));
      const userData = snapshot.val();
      if (userData) {
        setFirstName(userData.firstName);
        setProfileImg(userData.profileImg);
      }
    }

    if (user) getUserDataFromDB();

  }, [activeUser, user]);

  useIonViewWillEnter(() => {
    getCountries();
    getCities();
    getUserName();
  }, []);

  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: "2.5"
  };
  
  const slide2Opts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: "auto"
  };

  return (
    <IonPage>
       <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader>
          <IonItem lines="none">
            <IonAvatar slot="end">
              {profileImg ? <IonImg src={profileImg} /> : <IonImg src="../assets/profile-placeholder-small.png" />}
            </IonAvatar>
            <IonLabel>Hi {firstName}!</IonLabel>
          </IonItem>
        </IonHeader>
        <IonHeader collapse="condense">
          <IonToolbar className='title-toolbar'>
            <IonTitle size="large" className='home-page-title'>Let's start your travel!</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar id='ion-searchbar'onClick={() => { history.push(`searchpage`) }} animated></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonListHeader>
            <IonLabel>Cities worth visting</IonLabel>
          </IonListHeader>
          <IonItem lines="none">
            <IonSlides options={slideOpts}>
              {cities.map((city, index) => {
                return (
                  <IonSlide className='ion-slide' key={`slide_${index}`}>
                    <IonCard className='cities-card' onClick={() => { history.push(`/cities/${city.id}`) }}>
                      <IonCardContent>
                        <IonCardTitle className='slider-card-title'>{city.name}</IonCardTitle>  
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
            {countries.map((country, index) => 
              <IonSlide className='ion-slide' key={`slide_${index}`}>
                <CountryItem country={country} key={country.id} /> 
              </IonSlide> 
            )}
          </IonSlides>
          </IonItem>

        </IonList>
      </IonContent>
    </IonPage>
  );
};
