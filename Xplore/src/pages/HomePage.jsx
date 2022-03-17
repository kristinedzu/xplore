import React from 'react';
import 
{IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonItem, IonAvatar, IonLabel, IonCard, IonImg, IonCardTitle,IonCardContent, IonList, IonListHeader} from '@ionic/react';
import { IonSlides, IonSlide, useIonViewWillEnter } from '@ionic/react';
import { useEffect, useState } from "react";
import CountryItem from "../components/CountryItem";
import { getAuth} from "firebase/auth";
import { useHistory } from "react-router-dom";
import { get } from "@firebase/database";
import { getUserRef } from "../firebase-config";



export default function HomePage(){
  const [user, setUser] = useState([]);
  const auth = getAuth();
  let activeUser = auth.currentUser;

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [firstName, setFirstName] = useState();
  const [profileImg, setProfileImg] = useState();
  const history = useHistory();

  async function getPosts() {
    const postsRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/posts.json`);
    const postsData = await postsRes.json();
    const posts = Object.keys(postsData).map(key => ({ id: key, ...postsData[key]})); // from object to array
    return posts;
  }

  async function getCountries() {
    const postsArray = await getPosts();

    const countriesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/countries.json`);
    const countriesData = await countriesRes.json();
    const allCountries = Object.keys(countriesData).map(key => ({ id: key, ...countriesData[key], posts: postsArray.find(post => post.countryId == key)})); // from object to array
    const countriesArray = allCountries.filter(country => country.posts != undefined);
    const filteredCountriesArray = allCountries.filter(country => country.posts != undefined && country.name.toLowerCase().includes(searchValue));
    setCountries(countriesArray);
    
    
    if(filteredCountriesArray.length == 1){
      setCountries(filteredCountriesArray);
    }else if(filteredCountriesArray.length == 0){
      setCountries(countriesArray);
    }
    
  }

  async function getCities() {
    const postsArray = await getPosts();

    const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
    const citiesData = await citiesRes.json();
    const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key], posts: postsArray.find(post => post.cityId == key)})); // from object to array
    const citiesArray = allCities.filter(city => city.posts != undefined);
    setCities(citiesArray);
  }

  async function getUserName() {
    const userRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users/${user.uid}.json`);
    const userData = await userRes.json();
    console.log(userData);
    setUser(userData);
  }

  function handleInput()  {
    setSearchValue(document.querySelector("#ion-searchbar").value)
    getCountries();
  }

  useEffect(() => {

    setUser(activeUser);

    async function getUserDataFromDB() {
      const snapshot = await get(getUserRef(user.uid));
      const userData = snapshot.val();
      if (userData) {
        setFirstName(userData.firstName);
        setProfileImg(userData.profileImg);
        console.log(userData);
      }
    }

    if (user) getUserDataFromDB();

  }, [activeUser, user]);

  useIonViewWillEnter(() => {
    
    getCountries();
    getCities();
    getUserName();
  });

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
       <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader>
          <IonItem lines="none">
            <IonAvatar slot="end">
              <IonImg src={profileImg} />
            </IonAvatar>
            <IonLabel>Hi {firstName}!</IonLabel>
          </IonItem>
        </IonHeader>
        <IonHeader collapse="condense">
          <IonToolbar className='title-toolbar'>
            <IonTitle size="large" className='home-page-title'>Let's start your travel!</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar id='ion-searchbar' onInput={handleInput} onIonChange={handleInput} animated></IonSearchbar>
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
                    <IonCard className='cities-card' onClick={() => { history.push(`countries/cities/${city.id}`) }}>
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
          <IonSlide className='ion-slide'>
          {countries.map((country) => {
              return (
                <CountryItem country={country} key={country.id} />  
              )
            })}
            </IonSlide>
          </IonSlides>

            {/* <IonSlides options={slide2Opts}>
            {countries.map((country, index) => {
              return (
                <IonSlide className='ion-slide' key={`slide_${index}`}>
                  <CountryItem country={country} key={country.id} />  
                </IonSlide>
              )
            })}
            </IonSlides> */}
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
