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
      <IonContent fullscreen class='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Forgot password!</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className="form-container">
          <form onSubmit={resetPass}>
              <IonItem>
                  <IonLabel position="stacked">E-mail</IonLabel>
                  <IonInput
                    value={mail} className="input" type="email" onIonChange={e => setMail(e.target.value)}></IonInput>
              </IonItem>
                <IonButton expand="block" class="ion-margin-top" type="submit" onClick={() => history.replace("/loginpage")}>Reset your password
                  <IonRippleEffect type="unbounded"></IonRippleEffect>
                </IonButton>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
