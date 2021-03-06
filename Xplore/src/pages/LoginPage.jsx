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
import { Toast } from "@capacitor/toast";

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
    .catch(async (error) => {
      //const errorCode = error.code;
      const errorMessage = error.message;
      if(error.code === "auth/invalid-email"){
        await Toast.show({
          text: "The password you entered is invalid.",
          position: "center"
        });
      } else if(error.code === "auth/wrong-password"){
        await Toast.show({
          text: "The password does not match to this user.",
          position: "center"
        });
      } else if(error.code === "auth/user-not-found"){
        await Toast.show({
          text: "We couldn't find a user with this email.",
          position: "center"
        });
      }
      
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
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='ion-padding'>
        <IonHeader collapse="condense" className='centered-flex'>
          <IonImg className='logo title-toolbar' src='../assets/icon/android-chrome-192x192.png'></IonImg>
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
              <p class="ion-padding-horizontal">Forgot your password? <Link to="/resetpage">Get new one!</Link></p>
              <IonButton expand="block" class="ion-margin-horizontal ion-margin-top" type="submit">Sign in
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
