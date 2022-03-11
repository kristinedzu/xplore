import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonRippleEffect,
  IonInput,
  IonLabel,
  IonItem,
  IonIcon
} from '@ionic/react';

import { getUserRef } from "../firebase-config";
import { get, set } from "@firebase/database";
import { cameraOutline } from 'ionicons/icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useHistory } from "react-router-dom";

export default function SignUpPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const auth = getAuth();

  const history = useHistory();

  // const userDataToAdd = {
  //   userId: user.uid,
  //   firstName: firstName,
  //   lastName: lastName
  // }

  function signUp(event){
    event.preventDefault();
    createUserWithEmailAndPassword(auth, mail, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      //await addUser(getUserRef(user.uid), userToUpdate);
      console.log(user.uid);
      //console.log(firstName);
      
      //const db = database;
      set(getUserRef(user.uid), {
        userId: user.uid,
        firstName: firstName,
        lastName: lastName
      });

    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.log(error);
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign up Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sign up</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={signUp}>
            <IonItem lines="none">
                <IonLabel>Choose Image</IonLabel>
                <IonButton>
                    <IonIcon slot="icon-only" icon={cameraOutline} />
                </IonButton>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">First name</IonLabel>
                <IonInput value={firstName} type="text" onIonChange={e => setFirstName(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Last name</IonLabel>
                <IonInput value={lastName} type="text" onIonChange={e => setLastName(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">E-mail</IonLabel>
                <IonInput
                  value={mail} type="email" onIonChange={e => setMail(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput value={password} type="Password" onIonChange={e => setPassword(e.target.value)}></IonInput>
            </IonItem>
            <IonButton expand="block" type="submit">Sign up
              <IonRippleEffect type="unbounded"></IonRippleEffect>
            </IonButton>
            <IonItem className="ion-text-center">
              <IonButton size="small" fill="clear" onClick={() => history.replace("/signinpage")}>
                  Sign Ip
              </IonButton>
            </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};
