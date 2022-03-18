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
import { citiesRef } from "../firebase-config";
import { remove, set } from "@firebase/database";


export default function ProfileListItem({ post }) {

    const [showActionSheet, setShowActionSheet] = useState(false);
    const [postCity, setPostCity] = useState();

    

    // async function deletePost() {
    //     //Deleting the post
    //     const url = `https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/posts/${post.id}.json`;
    //     const response = await fetch(url, {
    //         method: "DELETE"
    //     });
    //     console.log(response);
    //     console.log("deleted");

    //      //Displaying the Toast 
    //     await Toast.show({
    //         text: "Your post is deleted!",
    //         position: "middle"
    //     });


    //     const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
    //     const citiesData = await citiesRes.json();
    //     const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key], post: post}));
    //     console.log(post);
    //     const citiesArray = allCities.filter(city => city.id == post.cityId);
    //     setPostCity(citiesArray);
    //     console.log(citiesArray);
    //     const postsCitiesArray = citiesArray.map(city => city.post);
    //     const postsLenght = postsCitiesArray.length;
    //     const cityID = citiesArray.find(city => city.id)

    //     console.log(postsLenght);
    //     console.log(cityID.id);

    //     if(postsLenght == 1){
    //         console.log("It's all good");
    //     } else {

    //         async function deleteCity(citiesArray) {

    //             const oldCityRef = remove(citiesRef);
    //             await set(oldCityRef, citiesArray);
    //         }

    //         deleteCity(citiesArray);
    //     }

    // }

    // async function deleteCity(){
    //     await deletePost();
    //     const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
    //     const citiesData = await citiesRes.json();
    //     const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key], post: post}));
    //     console.log(post);
    //     const citiesArray = allCities.filter(city => city.id == post.cityId);
    //     setPostCity(citiesArray);
    //     const postsCitiesArray = citiesArray.map(city => city.post);
    //     const postsLenght = postsCitiesArray.length;
    //     const cityID = citiesArray.find(city => city.id)

    //     console.log(postsLenght);
    //     console.log(cityID.id);

    //     if(postsLenght == 0){
    //         console.log("there are no posts");
    //         // const url = `https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities/${cityID.id}.json`;
    //         // const response = await fetch(url, {
    //         //     method: "DELETE"
    //         // });
    //         // console.log(response);
    //     }
    //}

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
                    <IonButton onClick={() => setShowActionSheet(true)} expand="block">
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
            // deletePost();
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
