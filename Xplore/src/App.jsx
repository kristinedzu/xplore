import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, addOutline, personCircleOutline } from 'ionicons/icons';
import HomePage from './pages/HomePage';
import AddNewPostPage from './pages/AddNewPostPage';
import CountryPage from './pages/CountryPage';
import CityPage from './pages/CityPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ResetPassPage from './pages/ResetPassPage';
import SearchPage from './pages/SearchPage';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';

setupIonicReact();

function PrivateRoutes(){
  return(
 
        <IonTabs className='nav'>
          <IonRouterOutlet>
            <Route exact path="/homepage">
              <HomePage />
            </Route>
            <Route exact path="/addnewpostpage">
              <AddNewPostPage />
            </Route>
            <Route path="/profilepage">
              <ProfilePage />
            </Route>
            <Route path="/users/:id">
              <ProfileEditPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/homepage" />
            </Route>
            <Route  path="/countries/:id">
                <CountryPage />
            </Route>
            <Route  path="/cities/:id">
                <CityPage />
            </Route>
            <Route  path="/searchpage">
                <SearchPage />
            </Route>
          </IonRouterOutlet>
          <IonTabBar className='main-nav' slot="bottom">
            <IonTabButton className='main-nav-tab' tab="Home Page" href="/homepage">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home Page</IonLabel>
            </IonTabButton>
            <IonTabButton className='main-nav-tab' tab="Add new post" href="/addnewpostpage">
              <IonIcon icon={addOutline} />
              <IonLabel>Add new post</IonLabel>
            </IonTabButton>
            <IonTabButton className='main-nav-tab' tab="Profile Page" href="/profilepage">
              <IonIcon icon={personCircleOutline} />
              <IonLabel>My profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
  );
}

function PublicRoutes(){
  return(
    <IonRouterOutlet>
      <Route exact path="/loginpage">
        <LoginPage />
      </Route>
      <Route exact path="/signuppage">
        <SignUpPage />
      </Route>
      <Route exact path="/resetpage">
        <ResetPassPage />
      </Route>
    </IonRouterOutlet>
  )
}

export default function App() {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(localStorage.getItem("userIsAuthenticated"));
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
          console.log(user);
          // User is authenticated
          setUserIsAuthenticated(true);
          localStorage.setItem("userIsAuthenticated", true);
      } else {
          // User is signed out
          setUserIsAuthenticated(false);
          localStorage.removeItem("userIsAuthenticated", false);
      }
    });
  }, [auth]);

  return (
    <IonApp>
      <IonReactRouter>
          {userIsAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
          <Route>{userIsAuthenticated ? <Redirect to="/homepage" /> : <Redirect to="/loginpage" />}</Route>
      </IonReactRouter>
    </IonApp>
  );
}
