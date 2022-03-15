import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from "react-router-dom";
import NewPostForm from '../components/NewPost';
import { push, set } from "@firebase/database";
import { postsRef } from "../firebase-config";
import { getAuth} from "firebase/auth";

export default function AddNewPostPage() {
  const history = useHistory();

  const auth = getAuth();
  let activeUser = auth.currentUser;
  
  async function handleSubmit(newPost) {
    newPost.uid = activeUser.uid; // default user id added

    const newPostRef = push(postsRef);
    await set(newPostRef, newPost);

    history.replace("/homepage");
  }

  return (
    <IonPage>
      <IonHeader>
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
