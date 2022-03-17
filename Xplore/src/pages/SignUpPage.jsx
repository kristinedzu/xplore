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
  IonRow
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

export default function SignUpPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePlaceholder] = useState("./public/assets/profile-placeholder-normal.png");
  const [profileImg, setProfileImg] = useState("");
  const [profileImgFile, setProfileImgFile] = useState("");
  const auth = getAuth();

  const history = useHistory();

  // const userDataToAdd = {
  //   userId: user.uid,
  //   firstName: firstName,
  //   lastName: lastName
  // }

  async function signUp(event){
    event.preventDefault();
    createUserWithEmailAndPassword(auth, mail, password)
    .then( async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      const userID = user.uid;
      console.log(userID);
      //console.log(firstName);
      
      const profileUrl = await uploadPicture(profileImgFile, userID);
      console.log(profileUrl);
  
      set(getUserRef(user.uid), {
        userId: user.uid,
        firstName: firstName,
        lastName: lastName,
        profileImg: profileUrl
      });
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.log(error);
    });
  }

  async function takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      width: 80,
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
    const profileRef = ref(storage, `${currentUser}.${imgFile.format}`);
    await uploadString(profileRef, profileImgFile.dataUrl, "data_url");
    const url = await getDownloadURL(profileRef);
    console.log(url);
    return url;
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign up Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='ion-padding'>
        <IonHeader collapse="condense" className='centered-flex'>
        <IonImg className='logo title-toolbar' src='..\assets\icon\android-chrome-192x192.png'></IonImg>
          <IonToolbar className='title-toolbar'>
            <IonTitle className='home-page-title' size="large">Sign up</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={signUp}>
            <IonGrid>
              <IonRow class='ion-justify-content-center'>
                <IonItem>
                {profileImg ? <IonImg className="profile-img" src={profileImg} onClick={takePicture}/> : <IonImg className="ion-padding profile-img" src='..\assets\profile-placeholder-normal.png' onClick={takePicture}/>}
                <IonButton className="add-pic" onClick={takePicture}>
                    <IonIcon slot="icon-only" icon={add} />
                </IonButton>
              </IonItem>
              </IonRow>
            </IonGrid>
            
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
            <IonButton expand="block" class="ion-margin-top" type="submit">Sign up
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
