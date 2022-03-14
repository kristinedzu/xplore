import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonLabel, IonTextarea, IonItem, IonSelect, IonSelectOption, IonButton} from '@ionic/react';
import { useEffect, useState } from "react";
import NewPostForm from '../components/NewPost';
import { push, set } from "@firebase/database";
import { postsRef } from "../firebase-config";
import { getAuth} from "firebase/auth";


// import { postsRef } from "../firebase-config";
// import { onValue } from "@firebase/database";
// import CountryItem from "../components/CountryItem";

export default function AddNewPostPage() {
  const auth = getAuth();
  let activeUser = auth.currentUser;
  
  async function handleSubmit(newPost) {
    newPost.uid = activeUser.uid; // default user id added

    const newPostRef = push(postsRef);
    await set(newPostRef, newPost);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add new post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add new post</IonTitle>
          </IonToolbar>
        </IonHeader>
        <NewPostForm handleSubmit={handleSubmit} />

        
      </IonContent>
    </IonPage>
  );
};
