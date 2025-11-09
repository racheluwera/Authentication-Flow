// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJaieMf-jQxT4Puoi8zrv9SP7ue4D9KdM",
  authDomain: "authentication-67937.firebaseapp.com",
  projectId: "authentication-67937",
  storageBucket: "authentication-67937.firebasestorage.app",
  messagingSenderId: "411559344325",
  appId: "1:411559344325:web:e3f2f54db66cf280e0d8ac",
  measurementId: "G-P1F6QWMB8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);