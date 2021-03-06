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
  IonIcon,
  IonImg,
  IonGrid,
  IonRow,
  IonAlert
} from '@ionic/react';

import { getUserRef } from "../firebase-config";
import { storage } from "../firebase-config";
import { get, set } from "@firebase/database";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { add } from 'ionicons/icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useHistory } from "react-router-dom";

import { Camera, CameraResultType } from "@capacitor/camera";
import { Toast } from "@capacitor/toast";

export default function SignUpPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [profileImgFile, setProfileImgFile] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  const auth = getAuth();

  const history = useHistory();

  async function signUp(event){
    event.preventDefault();

    if(!mail || !password || !firstName || !lastName ) {
      setShowAlert1(true);
    } else {
      createUserWithEmailAndPassword(auth, mail, password)
      .then( async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const userID = user.uid;
        
        const profileUrl = await uploadPicture(profileImgFile, userID);
    
        set(getUserRef(user.uid), {
          userId: user.uid,
          firstName: firstName,
          lastName: lastName,
          profileImg: profileUrl
        });
      })
      .catch(async (error) => {
        const errorMessage = error.message;
        if(error.code === "auth/weak-password"){
          await Toast.show({
            text: "The password has to contain at least 6 characters.",
            position: "center"
          });
        }
      });
    }
  }

  async function takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      width: 500,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    //let imageUrl = image.webPath;
    setProfileImgFile(image);
    setProfileImg(image.dataUrl);
    // Can be set to the src of an image now
    //ioimageElement.src = imageUrl;
  };

  async function uploadPicture(imgFile, currentUser){
    if(imgFile == "" && profileImgFile == ""){
      return null;
    }
    const profileRef = ref(storage, `users/${currentUser}.${imgFile.format}`);
    await uploadString(profileRef, profileImgFile.dataUrl, "data_url");
    const url = await getDownloadURL(profileRef);
    return url;
  }


  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Sign up Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='ion-padding'>
        <IonHeader collapse="condense" className='centered-flex'>
          <IonToolbar className='title-toolbar'>
            <IonTitle className='home-page-title' size="large">Sign up</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={signUp}>
            <IonGrid>
              <IonRow class='ion-justify-content-center'>
                <IonItem lines='none'>
                  {profileImg ? <IonImg className="profile-img" src={profileImg} onClick={takePicture}/> : <IonImg className="ion-padding profile-img" src='../assets/profile-placeholder-normal.png' onClick={takePicture}/>}
                  <IonButton className="add-pic" onClick={takePicture}>
                      <IonIcon slot="icon-only" icon={add} />
                  </IonButton>
                </IonItem>
              </IonRow>
            </IonGrid>
            <IonItem>
                <IonLabel position="stacked"><span class='red-text'>* </span>First name</IonLabel>
                <IonInput value={firstName} type="text" onIonChange={e => setFirstName(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked"><span class='red-text'>* </span>Last name</IonLabel>
                <IonInput value={lastName} type="text" onIonChange={e => setLastName(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked"><span class='red-text'>* </span>E-mail</IonLabel>
                <IonInput
                  value={mail} type="email" onIonChange={e => setMail(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked"><span class='red-text'>* </span>Password</IonLabel>
                <IonInput value={password} type="Password" onIonChange={e => setPassword(e.target.value)}></IonInput>
            </IonItem>
            <IonItem lines='none' class='small-text'>Password should have at least 6 characters.</IonItem>
            <IonAlert
                isOpen={showAlert1}
                onDidDismiss={() => setShowAlert1(false)}
                header={'Please fill out all fields'}
                buttons={['OK']}
            />
            <IonButton expand="block" class="ion-margin-horizontal ion-margin-top" type="submit">Sign up
              <IonRippleEffect type="unbounded"></IonRippleEffect>
            </IonButton>
            <IonItem className="ion-text-center padding-top" lines="none">
                <IonLabel>If you already have an account</IonLabel>
              </IonItem>
              <IonButton className='centered-flex' fill="clear" onClick={() => history.replace("/loginpage")}>
                  Log In
              </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};
