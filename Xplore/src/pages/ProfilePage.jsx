import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonButtons, IonLabel, IonIcon, IonChip, IonAvatar, IonImg } from '@ionic/react';
import { mail, settingsOutline } from 'ionicons/icons';
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useIonViewWillEnter } from '@ionic/react';
import { useHistory } from "react-router-dom";

export default function ProfilePage() {

  const [user, setUser] = useState([]);
  const auth = getAuth();
  let activeUser = auth.currentUser;
  const history = useHistory();

  function signOutUser() {
    signOut(auth);
  }

  async function getUserName() {
    const userRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users/${activeUser.uid}.json`);
    const userData = await userRes.json();
    console.log(userData);
    setUser(userData);
  }

  useIonViewWillEnter(() => {
    getUserName();
  });

  function goToProfile() {
    history.push(`users/${activeUser.uid}`);
}

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar class="ion-padding">
        <IonButtons slot="primary">
          <IonButton color="primary" onClick={goToProfile}>
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
            <IonChip>
              <IonIcon color="primary" icon={mail} />
              <IonLabel color="secondary">{activeUser.email}</IonLabel>
            </IonChip>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
