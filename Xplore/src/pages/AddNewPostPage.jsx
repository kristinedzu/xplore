import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { useHistory } from "react-router-dom";
import NewPostForm from '../components/NewPost';
import { push, set } from "@firebase/database";
import { postsRef, storage } from "../firebase-config";
import { getAuth} from "firebase/auth";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { Toast } from "@capacitor/toast";

export default function AddNewPostPage() {
  const history = useHistory();
  const [showLoader, dismissLoader] = useIonLoading();

  const auth = getAuth();
  let activeUser = auth.currentUser;
  
  async function handleSubmit(newPost) {
    showLoader();
    newPost.uid = activeUser.uid; // default user id added
    const newPostRef = push(postsRef);
    const newPostKey = newPostRef.key;
    const imageUrl = await uploadImage(newPost.img, newPostKey);
    newPost.img = imageUrl;
    await set(newPostRef, newPost);

    history.replace("/homepage");
    dismissLoader();


    await Toast.show({
      text: "Your post is created!",
      position: "center"
    });
  }

  async function uploadImage(imgFile, postKey){
    const imageRef = ref(storage, `posts/${postKey}.${imgFile.format}`);
    await uploadString(imageRef, imgFile.dataUrl, "data_url");
    const url = await getDownloadURL(imageRef);
    console.log(url);
    return url;
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Add new post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add new post</IonTitle>
          </IonToolbar>
        </IonHeader>
        <NewPostForm handleSubmit={handleSubmit} />

        
      </IonContent>
    </IonPage>
  );
};
