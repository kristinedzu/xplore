import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonImg, IonGrid, IonRow} from "@ionic/react";
import { add } from 'ionicons/icons';
import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { storage } from "../firebase-config";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";

export default function PostForm({ user, handleSubmit }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profileImg, setProfileImg] = useState("");
    const [profileImgFile, setProfileImgFile] = useState("");

    useEffect(() => {
        if(user){
        setFirstName(user.firstName);
        setLastName(user.lastName);
        }
    }, [user]);

    
    async function submitEvent(event) {
        event.preventDefault();
        const profileUrl = await uploadPicture(profileImgFile, user);
        const userData = { firstName: firstName, lastName: lastName, profileImg: profileUrl};
        handleSubmit(userData);
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
        if(imgFile === "" && profileImgFile === ""){
            return null;
        }
        const profileRef = ref(storage, `users/${currentUser}.${imgFile.format}`);
        await uploadString(profileRef, profileImgFile.dataUrl, "data_url");
        const url = await getDownloadURL(profileRef);
        return url;
    }
    
    return (
        <form onSubmit={submitEvent}>
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
                <IonItem className="input-item">
                    <IonLabel position="stacked">First name</IonLabel>
                    <IonInput value={firstName} placeholder={user.firstName} onIonChange={e => setFirstName(e.target.value)}></IonInput>
                </IonItem>
                <IonItem className="input-item">
                    <IonLabel position="stacked">Last name</IonLabel>
                    <IonInput value={lastName} onIonChange={e => setLastName(e.target.value)}></IonInput>
                </IonItem>
                <IonButton type="submit" expand="block">Save</IonButton>
            </form>
    );
}