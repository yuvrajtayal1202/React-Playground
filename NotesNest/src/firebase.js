// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC-OT27voDpmifdcErxo37LkIqw0j2ZRY",
  authDomain: "notesnest-de238.firebaseapp.com",
  projectId: "notesnest-de238",
storageBucket: "notesnest-de238.appspot.com",
 messagingSenderId: "899523309784",
  appId: "1:899523309784:web:9e3cf480d98ee5e71827ad",
  measurementId: "G-ZKW36X0N2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);