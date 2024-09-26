// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGl8neuTaETve8bfFlt-rTc3h4CtbloM4",
  authDomain: "monkey-blogging-e9252.firebaseapp.com",
  projectId: "monkey-blogging-e9252",
  storageBucket: "monkey-blogging-e9252.appspot.com",
  messagingSenderId: "866018376726",
  appId: "1:866018376726:web:2ea602da20a1cc771e8937",
  measurementId: "G-VVXBPBD7S6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
