// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
import { getDatabase,ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuPUGquxv9JTXbhjGGReYJLhKtP0wpxJE",
  authDomain: "xplore-cf984.firebaseapp.com",
  databaseURL: "https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "xplore-cf984",
  storageBucket: "xplore-cf984.appspot.com",
  messagingSenderId: "310962694352",
  appId: "1:310962694352:web:69502edc210b7eabad56d5",
  measurementId: "G-WJ7XQP6N0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize auth
export const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence
});
const analytics = getAnalytics(app);
export const storage = getStorage(app);
//const auth = getAuth(app);
// const storage = getStorage(firebaseApp);

export const database = getDatabase(app);
export const postsRef = ref(database, "posts");
export const citiesRef = ref(database, "cities");
export const usersRef = ref(database, "users");

export function getUserRef(userId) {
  return ref(database, "users/" + userId);
}

