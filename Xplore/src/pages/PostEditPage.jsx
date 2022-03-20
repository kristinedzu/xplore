import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, useIonLoading } from '@ionic/react';
import { useState } from "react";
import { useIonViewWillEnter } from "@ionic/react";
import { postsRef } from "../firebase-config";
import { onValue } from "@firebase/database";
import { useParams } from "react-router";
import EditPostForm from "../components/EditPostForm";
import { useHistory } from "react-router-dom";
import { Toast } from "@capacitor/toast";


export default function PostEditPage() {
  const [post, setPost] = useState([]);
  const [showLoader, dismissLoader] = useIonLoading();
  const history = useHistory();

  const params = useParams();
  const postId = params.id;
  
  console.log(post);

  useIonViewWillEnter(() => {
    async function getPost() {
      onValue(postsRef, async snapshot => {
        const allPosts = [];
        snapshot.forEach(postSnapshot => {
            const id = postSnapshot.key;
            const data = postSnapshot.val();
  
            const post = {
                id,
                ...data,
            };
            allPosts.push(post);
        });
        const postsArray = allPosts.find(post => post.id == postId);
        setPost(postsArray); // newest post first
      });
    }
    getPost();
  }, []);

  async function updatePost(postToUpdate) {
    showLoader();
    const url = `https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`;
    await fetch(url, {
        method: "PUT",
        body: JSON.stringify({ ...post, ...postToUpdate })
    });

    history.replace("/profilepage");
    dismissLoader();

    await Toast.show({
      text: "Your post has been updated!",
      position: "center"
  });
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
          <IonTitle>Post Edit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Edit your post</IonTitle>
          </IonToolbar>
        </IonHeader>
            <IonList>
                <EditPostForm post={post} handleSubmit={updatePost}/>
            </IonList>
      </IonContent>
    </IonPage>
  );
};
