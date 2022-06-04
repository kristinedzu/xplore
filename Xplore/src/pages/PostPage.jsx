import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItemGroup, IonImg, IonLabel, IonItem, IonAvatar, IonCard, IonCardContent, IonList, IonListHeader, IonButton } from '@ionic/react';
import { useState } from "react";
import { useIonViewWillEnter } from "@ionic/react";
import { postsRef } from "../firebase-config";
import { onValue } from "@firebase/database";
import { useParams } from "react-router";
import PostListItem from '../components/PostListItem';
import ReactStars from "react-rating-stars-component";
import { useHistory } from "react-router-dom";



export default function PostPage() {
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  
  const history = useHistory();

  const params = useParams();
  const postId = params.id;
  
  console.log(post);

  async function getUsers() {
    const usersRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users.json`);
    const usersData = await usersRes.json();
    const allUsers = Object.keys(usersData).map(key => ({ id: key, ...usersData[key] }));
    return allUsers;
  }

  async function getCommentAuth() {
    const usersRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/users.json`);
    const usersData = await usersRes.json();
    const allUsers = Object.keys(usersData).map(key => ({ id: key, ...usersData[key] }));
    setUsers(allUsers);
  }

  async function getCities() {
    const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
    const citiesData = await citiesRes.json();
    const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key] }));
    return allCities;
  }

  async function getComments() {
    const commentsRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/comments.json`);
    const commentsData = await commentsRes.json();
    const allComments = Object.keys(commentsData).map(key => ({ id: key, ...commentsData[key] }));
    return allComments;
  }

  useIonViewWillEnter(() => {
    async function getPost() {
      const users = await getUsers();
      const cities = await getCities();
      const comments = await getComments();
      onValue(postsRef, async snapshot => {
        const allPosts = [];
        snapshot.forEach(postSnapshot => {
            const id = postSnapshot.key;
            const data = postSnapshot.val();
  
            const post = {
                id,
                ...data,
                user: users.find(user => user.id == data.uid),
                city: cities.find(city => city.id == data.cityId),
                comments: comments.filter(comment => comment.postId == postId)
                
            };
            allPosts.push(post);
        });
        const postsArray = allPosts.find(post => post.id == postId);
        setPost(postsArray); // newest post first
      });
    }
    getPost();
    getCommentAuth();
  }, []);

  console.log(users);

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
        
        <IonCard key={post.key}>
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
        
        <IonButton onClick={() => { history.push(`/${post.id}/addcomment`) }} className="ion-padding">Add comment</IonButton>

        <IonList>
          <IonListHeader>
            <IonLabel>All Comments</IonLabel>
          </IonListHeader>

          {post.comments?.map(comment => 
          
          
          <IonCard key={comment.id}>
            <IonCardContent className="card-flex">
                <IonLabel>{comment.comment}</IonLabel>
                <IonItem lines="none" color="none" className="post-list-item">
                  {users.filter(auth => auth.id == comment.uid).map(auths =>
                    <IonAvatar key={Math.random().toString(16)} slot="start">
                    {auths?.profileImg ? <IonImg src={auths?.profileImg} /> : <IonImg src="../assets/profile-placeholder-small.png" />}
                    </IonAvatar>
                  )}
                  <IonLabel>
                    {users.filter(auth => auth.id == comment.uid).map(auths =>
                    <h2 key={Math.random().toString(16)}>{auths?.firstName}</h2>
                    )}
                    <ReactStars
                        count={comment.review}
                        size={18}
                        color="#ffd700"
                    />
                  </IonLabel>
                </IonItem>
            </IonCardContent>
          </IonCard>
          )}

        </IonList>
        

        

      </IonContent>
    </IonPage>
  );
};
