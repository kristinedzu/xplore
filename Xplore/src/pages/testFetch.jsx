import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList } from '@ionic/react';
import { useEffect, useState } from "react";
import { postsRef } from "../firebase-config";
import { onValue } from "@firebase/database";
import PostListItem from "../components/PostListItem";

export default function AddNewPostPage() {
  const [posts, setPosts] = useState([]);

  async function getUsers() {
    const response = await fetch("https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users.json");
    const data = await response.json();
    // mapp object into an array with objects
    const users = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    return users;
  }

  async function getCountries() {
    const response = await fetch("https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/countries.json");
    const data = await response.json();
    // mapp object into an array with objects
    const countries = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    return countries;
  }

  async function getCities() {
    const response = await fetch("https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json");
    const data = await response.json();
    // mapp object into an array with objects
    const cities = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    return cities;
  }
console.log(posts);


useEffect(() => {
    async function listenOnChange() {

        const usersArray = await getUsers();
        const countriesArray = await getCountries();
        const citiesArray = await getCities();

        onValue(postsRef, async snapshot => {
            const postsArray = [];
            snapshot.forEach(postSnapshot => {
                const id = postSnapshot.key;
                const data = postSnapshot.val();
                const post = {
                    id,
                    ...data,
                    user: usersArray.find(user => user.id == data.uid),
                    country: countriesArray.find(country => country.id == data.countryId),
                    city: citiesArray.find(city => city.id == data.cityId)
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
          <IonTitle>Add new post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add new post</IonTitle>
          </IonToolbar>
          
          <IonList>
              {posts.map(post => post.user && 
                  <PostListItem post={post} key={post.id} />
              )}
          </IonList>

        </IonHeader>
      </IonContent>
    </IonPage>
  );
};



import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonLabel } from '@ionic/react';
import { useEffect, useState } from "react";
import { postsRef } from "../firebase-config";
import { onValue } from "@firebase/database";
import CityItem from "../components/CityItem";
import PostSlider from "../components/PostSlider";
import { useParams } from "react-router";
import { useIonViewWillEnter } from "@ionic/react";


export default function CountryPage() {
  const [posts, setPosts] = useState([]);
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
            <IonLabel>{city.name}</IonLabel>
          </IonListHeader>
            {posts?.map(post => post &&
              <PostSlider post={post} key={post.id} />
            )}
        </IonList>
        )}
          
        
        
        
      </IonContent>
    </IonPage>
  );
};
