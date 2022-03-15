import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonButtons, IonLabel, IonIcon, IonChip, IonAvatar, IonImg } from '@ionic/react';
import { postsRef } from "../firebase-config";
import { mail, settingsOutline } from 'ionicons/icons';
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useIonViewWillEnter } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { onValue } from "@firebase/database";
import ProfileListItem from '../components/ProfileListItem';

export default function ProfilePage() {

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [city, setCity] = useState([]);

  const auth = getAuth();
  let activeUser = auth.currentUser;
  const history = useHistory();

  function signOutUser() {
    signOut(auth);
  }

  async function loadCity() {
    //fetch country data by countryId prop
    const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
    const citiesData = await citiesRes.json();
    const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key]})); // from object to array
    console.log(allCities);
    return allCities;  
  }

  async function getUserName() {
    const userRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users/${activeUser.uid}.json`);
    const userData = await userRes.json();
    setUser(userData);
  }
  
  async function listenOnChange() {
    const cities = await loadCity();
    onValue(postsRef, async snapshot => {
        const postsArray = [];
        snapshot.forEach(postSnapshot => {
          const id = postSnapshot.key;
          const data = postSnapshot.val();
          console.log(data);
          console.log(data.cityId);

          const post = {
              id,
              ...data,
              city: cities.find(city => city.id == data.cityId)
          };
          postsArray.push(post);
          console.log(post);
        });
        console.log(cities);
        const userPostsArray = postsArray.filter(post => post.uid == activeUser.uid);
        setPosts(userPostsArray.reverse()); // newest post first
        console.log(userPostsArray);
    });
  }

  useIonViewWillEnter(() => {
    getUserName();
    loadCity();
    listenOnChange();
    console.log("OnEnter");
  });

  function goToProfileEdit() {
    history.push(`users/${activeUser.uid}`);
  }

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar class="ion-padding">
      <IonTitle>Profile</IonTitle>
        <IonButtons slot="primary">
          <IonButton color="primary" onClick={goToProfileEdit}>
            <IonIcon slot="icon-only" icon={settingsOutline} />
          </IonButton>
        </IonButtons>
        <IonButton onClick={signOutUser}>Sign Out</IonButton>
      </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{user.firstName}</IonTitle>
            <IonAvatar slot="end">
              <IonImg src={user.profileImg} />
            </IonAvatar>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem lines="none">
            <IonLabel>{user.lastName}</IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonChip>
              <IonIcon color="primary" icon={mail} />
              <IonLabel color="secondary">{activeUser.email}</IonLabel>
            </IonChip>
          </IonItem>
          <IonItem className='padding-top'>
          <h3>Your Posts</h3>
          </IonItem>
        </IonList>
        <IonList>
          {posts.map(post => 
              <ProfileListItem post={post} key={post.id} />
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
