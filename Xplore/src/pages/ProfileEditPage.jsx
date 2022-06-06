import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonButtons, IonLabel, useIonLoading,IonBackButton } from '@ionic/react';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useIonViewWillEnter } from '@ionic/react';
import { useParams } from "react-router";
import PostForm from "../components/PostForm";
import { Toast } from "@capacitor/toast";

export default function ProfileEditPage() {

  const history = useHistory();
  const [showLoader, dismissLoader] = useIonLoading();
  const [user, setUser] = useState([]);
  const params = useParams();
  const userId = params.id;

  async function getUserName() {
    const userRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`);
    const userData = await userRes.json();
    setUser(userData);
  }

  useIonViewWillEnter(() => {
    getUserName();
  });

    async function updateUser(userToUpdate) {
      showLoader();
      const url = `https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`;
      await fetch(url, {
          method: "PUT",
          body: JSON.stringify({ ...user, ...userToUpdate })
      });

      history.replace("/profilepage");
      dismissLoader();
      await Toast.show({
        text: "Your profile has been updated!",
        position: "center"
      });
    }

  return (
    <IonPage>
      <IonHeader translucent>
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
