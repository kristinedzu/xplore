import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { useState } from "react";
import { useIonViewWillEnter } from "@ionic/react";
import { postsRef } from "../firebase-config";
import { onValue } from "@firebase/database";
import { useParams } from "react-router";
import PostListItem from '../components/PostListItem';


export default function CityPage() {
  const [posts, setPosts] = useState([]);
  const [city, setCity] = useState([]);
  const params = useParams();
  const cityId = params.id;

  async function loadCity() {
    const cityRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities/${cityId}.json`);
    const cityData = await cityRes.json();
    setCity(cityData);
  }

  async function getUsers() {
    const usersRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users.json`);
    const usersData = await usersRes.json();
    const allUsers = Object.keys(usersData).map(key => ({ id: key, ...usersData[key] }));
    return allUsers;
  }

  
  console.log(posts);

  useIonViewWillEnter(() => {
    loadCity();
    async function getPosts() {
      const users = await getUsers();
      onValue(postsRef, async snapshot => {
        const allPosts = [];
        snapshot.forEach(postSnapshot => {
            const id = postSnapshot.key;
            const data = postSnapshot.val();
  
            const post = {
                id,
                ...data,
                user: users.find(user => user.id == data.uid)
            };
            allPosts.push(post);
        });
        const postsArray = allPosts.filter(post => post.cityId == cityId);
        setPosts(postsArray.reverse()); // newest post first
      });
    }
    getPosts();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
          <IonTitle>{city.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{city.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {posts.map(post => 
            <PostListItem post={post} key={post.id} />
        )}
        
      </IonContent>
    </IonPage>
  );
};
