import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItemGroup, IonImg, IonLabel, IonItem, IonAvatar, IonCard, IonCardContent } from '@ionic/react';
import { useState } from "react";
import { useIonViewWillEnter } from "@ionic/react";
import { postsRef } from "../firebase-config";
import { onValue } from "@firebase/database";
import { useParams } from "react-router";
import PostListItem from '../components/PostListItem';
import ReactStars from "react-rating-stars-component";



export default function PostPage() {
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);

  const params = useParams();
  const postId = params.id;
  
  console.log(post);

  async function getUsers() {
    const usersRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users.json`);
    const usersData = await usersRes.json();
    const allUsers = Object.keys(usersData).map(key => ({ id: key, ...usersData[key] }));
    return allUsers;
  }

  async function getCities() {
    const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
    const citiesData = await citiesRes.json();
    const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key] }));
    return allCities;
  }

  useIonViewWillEnter(() => {
    async function getPost() {
      const users = await getUsers();
      const cities = await getCities();
      onValue(postsRef, async snapshot => {
        const allPosts = [];
        snapshot.forEach(postSnapshot => {
            const id = postSnapshot.key;
            const data = postSnapshot.val();
  
            const post = {
                id,
                ...data,
                user: users.find(user => user.id == data.uid),
                city: cities.find(city => city.id == data.cityId)
            };
            allPosts.push(post);
        });
        const postsArray = allPosts.find(post => post.id == postId);
        setPost(postsArray); // newest post first
      });
    }
    getPost();
  }, []);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
          <IonTitle>Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{post.city?.name}</IonTitle>
          </IonToolbar>
        </IonHeader>


        <IonCard>
            <IonImg className="post-img-profile" src={post.img} />
            <IonCardContent className="card-flex">
        <IonLabel>{post.body}</IonLabel>
                <IonItem lines="none" color="none" className="post-list-item">
                    <IonAvatar slot="start">
                    {post.user?.profileImg ? <IonImg src={post.user?.profileImg} /> : <IonImg src="../assets/profile-placeholder-small.png" />}
                    </IonAvatar>
                    <IonLabel>
                        <h2>{post.user?.firstName}</h2>
                        <ReactStars
                            count={post.review}
                            size={18}
                            color="#ffd700"
                        />
                    </IonLabel>
                </IonItem>
                </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};
