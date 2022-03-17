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
  IonImg
} from '@ionic/react';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";

import { SplashScreen } from '@capacitor/splash-screen';

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

  async function screen(){
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true
    });
  }

  useEffect(() => {
    screen();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='ion-padding'>
        <IonHeader collapse="condense" className='centered-flex'>
          <IonImg className='logo title-toolbar' src='..\assets\icon\android-chrome-192x192.png'></IonImg>
          <IonToolbar className='title-toolbar'>
            <IonTitle className='home-page-title' size="large">Let's start your travel!</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className="form-container">
          <form onSubmit={signIn}>
              <IonItem className='input-item'>
                  <IonLabel position="stacked">E-mail</IonLabel>
                  <IonInput value={mail} type="email" onIonChange={e => setMail(e.target.value)}></IonInput>
              </IonItem>
              <IonItem className='input-item'>
                  <IonLabel position="stacked">Password</IonLabel>
                  <IonInput value={password} type="Password" onIonChange={e => setPassword(e.target.value)}></IonInput>
              </IonItem>
              <p>Forgot your password? <Link to="/resetpage">Get new one!</Link></p>
              <IonButton expand="block" class="ion-margin-top" type="submit">Sign in
                <IonRippleEffect type="unbounded"></IonRippleEffect>
              </IonButton>
              <IonItem className="ion-text-center padding-top" lines="none">
                <IonLabel>You don't have an account yet?</IonLabel>
              </IonItem>
              <IonButton className='centered-flex' fill="clear" onClick={() => history.replace("/signuppage")}>
                  Sign Up
              </IonButton>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
