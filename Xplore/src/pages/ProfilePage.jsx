import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonButtons, IonLabel, IonIcon, IonChip, IonAvatar, IonImg } from '@ionic/react';
import { postsRef } from "../firebase-config";
import { settingsOutline } from 'ionicons/icons';
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useIonViewWillEnter } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { onValue } from "@firebase/database";
import ProfileListItem from '../components/ProfileListItem';
import { get } from "@firebase/database";
import { getUserRef } from "../firebase-config";

export default function ProfilePage() {

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [firstName, setFirstName] = useState();
  const [profileImg, setProfileImg] = useState();
  const [lastName, setLastName] = useState();
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
    setCity(allCities);
    return allCities;  
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
        setLastName(userData.lastName);
      }
    }

    if (user) getUserDataFromDB();

  }, [activeUser, user]);
  
  async function listenOnChange() {
    const cities = await loadCity();
    onValue(postsRef, async snapshot => {
        const postsArray = [];
        snapshot.forEach(postSnapshot => {
          const id = postSnapshot.key;
          const data = postSnapshot.val();

          const post = {
              id,
              ...data,
              city: cities.find(city => city.id == data.cityId)
          };
          postsArray.push(post);
        });
        const userPostsArray = postsArray.filter(post => post.uid == activeUser.uid);
        setPosts(userPostsArray.reverse()); // newest post first
    });
  }

  useIonViewWillEnter(() => {
    getUserName();
    loadCity();
    listenOnChange();
  }, []);

  function goToProfileEdit() {
    history.push(`users/${activeUser.uid}`);
  }

  return (
    <IonPage>
      <IonHeader translucent>
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
            <IonTitle size="large">{firstName}</IonTitle>
            <IonAvatar slot="end">
              {profileImg ? <IonImg src={profileImg} /> : <IonImg src="../assets/profile-placeholder-small.png" />}
            </IonAvatar>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem lines="none">
            <IonLabel>{lastName}</IonLabel>
          </IonItem>
          <IonItem className='padding-top' lines='none'>
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
