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
  IonButtons,
  IonBackButton

} from '@ionic/react';

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from 'react';
import { useHistory } from "react-router-dom";

export default function ResetPassPage() {
  const [mail, setMail] = useState("");
  const auth = getAuth();
  const history = useHistory();

  function resetPass(event){
    event.preventDefault();
    sendPasswordResetEmail(auth, mail)
    .then(() => {
      // Password reset email sent! 
      console.log("Email has been sent on the mail: " + mail);
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
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Reset your password</IonTitle>
          <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar className='title-toolbar'>
            <IonTitle className='home-page-title' size="large">Reset your password</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className="form-container">
          <form onSubmit={resetPass}>
              <IonItem className='input-item'>
                  <IonLabel position="stacked">E-mail</IonLabel>
                  <IonInput
                    value={mail} className="input" type="email" onIonChange={e => setMail(e.target.value)}></IonInput>
              </IonItem>
              <p class="ion-padding-horizontal">We will send you an email to provide you with the password reset instructions.</p>
                <IonButton  expand="block" class="ion-margin-horizontal ion-margin-top" type="submit" onClick={() => history.replace("/loginpage")}>Reset your password
                  <IonRippleEffect type="unbounded"></IonRippleEffect>
                </IonButton>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
