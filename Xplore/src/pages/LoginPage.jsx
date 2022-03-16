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
  IonList,
  IonSelectOption,
  IonSelect
} from '@ionic/react';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useHistory, Link } from "react-router-dom";

export default function LoginPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const history = useHistory();

  function signIn(event){
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
      <IonContent fullscreen class='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Let's start your travel!</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className="form-container">
          <form onSubmit={signIn}>
              <IonItem>
                  <IonLabel position="stacked">E-mail</IonLabel>
                  <IonInput
                    value={mail} className="input" type="email" onIonChange={e => setMail(e.target.value)}></IonInput>
              </IonItem>
              <IonItem>
                  <IonLabel position="stacked">Password</IonLabel>
                  <IonInput value={password} type="Password" onIonChange={e => setPassword(e.target.value)}></IonInput>
              </IonItem>
              <p>Forgot your password? <Link to="/resetpage">Get new one!</Link></p>
              <IonButton expand="block" class="ion-margin-top" type="submit">Sign in
                <IonRippleEffect type="unbounded"></IonRippleEffect>
              </IonButton>
              <IonItem className="ion-text-center" lines="none">
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
