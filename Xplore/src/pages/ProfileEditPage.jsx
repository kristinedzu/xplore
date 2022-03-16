import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonButtons, IonLabel, IonInput,IonBackButton } from '@ionic/react';
import { useState } from "react";
import { useIonViewWillEnter } from '@ionic/react';
import { useParams } from "react-router";
import PostForm from "../components/PostForm";

export default function ProfileEditPage() {

  const [user, setUser] = useState([]);
  const params = useParams();
  const userId = params.id;

  async function getUserName() {
    const userRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`);
    const userData = await userRes.json();
    console.log(userData);
    setUser(userData);
  }

  useIonViewWillEnter(() => {
    getUserName();
  });

    async function updateUser(userToUpdate) {
        const url = `https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`;
        await fetch(url, {
            method: "PUT",
            body: JSON.stringify({ ...user, ...userToUpdate })
        });
        console.log("User Updated");
    }

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar class="ion-padding">
      <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle size="large">Edit your profile</IonTitle>
      </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Edit your profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
            <PostForm user={user} handleSubmit={updateUser}/>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
