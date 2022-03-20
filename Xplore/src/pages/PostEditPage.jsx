import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList } from '@ionic/react';
import { useState } from "react";
import { useIonViewWillEnter } from "@ionic/react";
import { postsRef } from "../firebase-config";
import { onValue } from "@firebase/database";
import { useParams } from "react-router";
import EditPostForm from "../components/EditPostForm";



export default function PostEditPage() {
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);

  const params = useParams();
  const postId = params.id;
  
  console.log(post);

  async function getUsers() {
    const usersRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users.json`);
    const usersData = await usersRes.json();
    const allUsers = Object.keys(usersData).map(key => ({ id: key, ...usersData[key] }));
    return allUsers;
  }

  async function getCities() {
    const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
    const citiesData = await citiesRes.json();
    const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key] }));
    return allCities;
  }

  useIonViewWillEnter(() => {
    async function getPost() {
      const users = await getUsers();
      const cities = await getCities();
      onValue(postsRef, async snapshot => {
        const allPosts = [];
        snapshot.forEach(postSnapshot => {
            const id = postSnapshot.key;
            const data = postSnapshot.val();
  
            const post = {
                id,
                ...data,
                user: users.find(user => user.id == data.uid),
                city: cities.find(city => city.id == data.cityId)
            };
            allPosts.push(post);
        });
        const postsArray = allPosts.find(post => post.id == postId);
        setPost(postsArray); // newest post first
      });
    }
    getPost();
  }, []);

  async function updatePost(postToUpdate) {
    const url = `https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`;
    await fetch(url, {
        method: "PUT",
        body: JSON.stringify({ ...post, ...postToUpdate })
    });
    console.log("Post Updated");
}

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
          <IonTitle>Post Edit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Edit your post</IonTitle>
          </IonToolbar>
        </IonHeader>
            <IonList>
                <EditPostForm post={post} handleSubmit={updatePost}/>
            </IonList>
      </IonContent>
    </IonPage>
  );
};
