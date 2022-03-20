import React from 'react';
import 
{IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonItem,IonBackButton, IonList, IonButtons, useIonLoading } from '@ionic/react';
import { IonSlides, IonSlide, useIonViewWillEnter } from '@ionic/react';
import { useEffect, useState } from "react";
import CountryItem from "../components/CountryItem";
import { getAuth} from "firebase/auth";
import { useHistory } from "react-router-dom";
import { get } from "@firebase/database";
import { getUserRef } from "../firebase-config";



export default function SearchPage(){
  const [user, setUser] = useState([]);
  const auth = getAuth();
  let activeUser = auth.currentUser;

  const [searchedCountries, setSearchedCountries] = useState([]);
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
    // showLoader();
    const postsArray = await getPosts();

    const countriesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/countries.json`);
    const countriesData = await countriesRes.json();
    const allCountries = Object.keys(countriesData).map(key => ({ id: key, ...countriesData[key], posts: postsArray.find(post => post.countryId == key)})); // from object to array
    const countriesArray = allCountries.filter(country => country.posts != undefined);
    const filteredCountriesArray = allCountries.filter(country => country.posts != undefined && country.name.toLowerCase().includes(searchValue));
    setSearchedCountries(countriesArray);
    // dismissLoader();

    if(filteredCountriesArray.length == 1){
        setSearchedCountries(filteredCountriesArray);
    }else if(filteredCountriesArray.length == 0){
        setSearchedCountries(countriesArray);
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

  function handleInput()  {
    setSearchValue(document.querySelector("#ion-search").value.toLowerCase());
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
      }
    }

    if (user) getUserDataFromDB();

  }, [activeUser, user]);

  useIonViewWillEnter(() => {
    getCountries();
    getCities();
  });

  return (
    <IonPage>
       <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
          <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar className='title-toolbar'>
            <IonTitle size="large" className='home-page-title'>Search for countries</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar id='ion-search' onInput={handleInput} onIonChange={handleInput} animated></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonList class='search-results-list'>
            {searchedCountries.map((country) => {
                return (
                  <CountryItem country={country} key={country.id} /> 
                )
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
