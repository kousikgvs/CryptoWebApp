// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBktXXQeMmKFa0woq6EsbDIvI-m7x5JXOs",
  authDomain: "cryptoapp-5199c.firebaseapp.com",
  projectId: "cryptoapp-5199c",
  storageBucket: "cryptoapp-5199c.appspot.com",
  messagingSenderId: "480877294479",
  appId: "1:480877294479:web:653516bb77f3a0b53611fa",
  measurementId: "G-0KEGEGN8V6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
