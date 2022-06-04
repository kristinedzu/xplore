import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import NewCommentForm from '../components/NewComment';
import { useParams } from "react-router";
import { push, set } from "@firebase/database";
import { commentsRef } from "../firebase-config";
import { getAuth} from "firebase/auth";
import { Toast } from "@capacitor/toast";

export default function AddCommentPage() {
  const history = useHistory();
  const [showLoader, dismissLoader] = useIonLoading();

  const auth = getAuth();
  let activeUser = auth.currentUser;

  const params = useParams();
  const postId = params.id;

  console.log(activeUser);
  
  async function handleSubmit(newComment) {
    showLoader();
    newComment.uid = activeUser.uid;
    newComment.postId = postId; // default user id added
    const newCommentRef = push(commentsRef);
    await set(newCommentRef, newComment);

    console.log(newComment);

    history.push(`/posts/${postId}`);
    dismissLoader();


    await Toast.show({
      text: "Your comment is added!",
      position: "center"
    });
    
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Add new comment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add new comment</IonTitle>
          </IonToolbar>
        </IonHeader>
        <NewCommentForm handleSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
};
