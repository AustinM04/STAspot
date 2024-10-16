// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZu4mpPXQPQAy1NRGbwme1-wDpR_zQYkY",
    authDomain: "staspot-38b72.firebaseapp.com",
    projectId: "staspot-38b72",
    storageBucket: "staspot-38b72.appspot.com",
    messagingSenderId: "794852854131",
    appId: "1:794852854131:web:c328f8f8a01309f9865d06",
    measurementId: "G-MX2328H53S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
