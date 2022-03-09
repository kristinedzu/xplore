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
import ProfilePage from './pages/ProfilePage';

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

setupIonicReact();

export default function App(){
  return(
    <IonApp>
        <IonReactRouter>
          <IonTabs className='nav'>
            <IonRouterOutlet>
              <Route exact path="/homepage">
                <HomePage />
              </Route>
              <Route exact path="/addnewpostpage">
                <AddNewPostPage />
              </Route>
              <Route path="/countries/:id">
                  <CountryPage />
              </Route>
              <Route path="/profilepage">
                <ProfilePage />
              </Route>
              <Route exact path="/">
                <Redirect to="/homepage" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="Home Page" href="/homepage">
                <IonIcon icon={homeOutline} />
                <IonLabel>Home Page</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Add new post" href="/addnewpostpage">
                <IonIcon icon={addOutline} />
                <IonLabel>Add new post</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Profile Page" href="/profilepage">
                <IonIcon icon={personCircleOutline} />
                <IonLabel>My profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    );
}
