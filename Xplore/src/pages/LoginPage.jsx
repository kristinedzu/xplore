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
  IonList
} from '@ionic/react';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const history = useHistory();

  function handleSubmit(event){
    event.preventDefault();
    signInWithEmailAndPassword(auth, mail, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign in Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sign in</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <form onSubmit={handleSubmit}>
              <IonItem>
                  <IonLabel position="stacked">E-mail</IonLabel>
                  <IonInput
                    value={mail} type="email" onIonChange={e => setMail(e.target.value)}></IonInput>
              </IonItem>
              <IonItem>
                  <IonLabel position="stacked">Password</IonLabel>
                  <IonInput value={password} type="Password" onIonChange={e => setPassword(e.target.value)}></IonInput>
              </IonItem>
              <IonButton expand="block" type="submit">Sign in
                <IonRippleEffect type="unbounded"></IonRippleEffect>
              </IonButton>
              <IonItem className="ion-text-center">
                <IonButton size="small" fill="clear" onClick={() => history.replace("/signuppage")}>
                    Sign Up
                </IonButton>
              </IonItem>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
