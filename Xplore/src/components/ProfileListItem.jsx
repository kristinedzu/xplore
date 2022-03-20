import {
    IonCard,
    IonCardContent,
    IonImg,
    IonChip,
    IonLabel,
    IonItem,
    IonActionSheet,
    IonButton,
    IonIcon
} from "@ionic/react";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import { trash, createOutline, close } from 'ionicons/icons';
import { Toast } from "@capacitor/toast";


export default function ProfileListItem({ post }) {
    const [showActionSheet, setShowActionSheet] = useState(false);
    
    async function getPosts() {
      const postsRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/posts.json`);
      const postsData = await postsRes.json();
      const posts = Object.keys(postsData).map(key => ({ id: key, ...postsData[key]})); // from object to array
      const thisCityPosts = posts.filter(thisPost => thisPost.cityId == post.cityId);
      return thisCityPosts;
    }

    async function deletePost() {
        //Deleting the post
        const url = `https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/posts/${post.id}.json`;
        const response = await fetch(url, {
            method: "DELETE"
        });
        console.log(response);
        console.log("post deleted");

         //Displaying the Toast 
        await Toast.show({
            text: "Your post is deleted!",
            position: "middle"
        });
    }

    // async function deleteCity() {
    //   await deletePost();

    //   const allPosts = await getPosts();
    //   console.log(allPosts.length);
    //   console.log(post.cityId);

    //     if(allPosts.length == 0) {
    //       console.log("no posts");

    //       const url = `https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities/${post.cityId}.json`;
    //         const response = await fetch(url, {
    //             method: "DELETE"
    //         });
    //         console.log(response);
    //         console.log("city deleted");
    //     }
    // }

    return (
        <IonCard>
            <IonImg className="post-img-profile" src={post.img} />
            <IonCardContent className="card-flex">
                <IonLabel>{post.body}</IonLabel>
                <IonItem className="profile-list-item" color="none" lines="none">
                    <IonChip>
                        <IonLabel>{post.city.name}</IonLabel>
                    </IonChip>
                    <IonLabel className="profile-stars">
                        <ReactStars
                            count={post.review}
                            size={18}
                            color="#ffd700"
                        />
                    </IonLabel>
                    <IonButton className="edit-button" onClick={() => setShowActionSheet(true)} expand="block">
                        <IonIcon slot="icon-only" icon={createOutline} />
                    </IonButton>
                </IonItem>
                <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        cssClass='my-custom-class'
        buttons={[{
          text: 'Delete your post',
          role: 'destructive',
          icon: trash,
          id: 'delete-button',
          data: {
            type: 'delete'
          },
          handler: () => {
            console.log('Delete clicked');
            deletePost();
            // deleteCity();
          }
        }, {
          text: 'Cancel',
          icon: close,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]}
      >
      </IonActionSheet>
            </IonCardContent>
        </IonCard>
    );
}
