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
  IonItem
} from '@ionic/react';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';

export default function LoginPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  function signIn(event){
    signInWithEmailAndPassword(auth, mail, password)
    event.then((userCredential) => {
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
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sign in</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={signIn} className="ion-padding">
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
        </form>
      </IonContent>
    </IonPage>
  );
};
