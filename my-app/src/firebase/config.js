import app from "firebase/app";
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBgzC3IIiOBHq3dpTf0i57Sb1rlWTHLElM",
    authDomain: "proyectointegrador-7d512.firebaseapp.com",
    projectId: "proyectointegrador-7d512",
    storageBucket: "proyectointegrador-7d512.appspot.com",
    messagingSenderId: "821387469543",
    appId: "1:821387469543:web:37ef8c9d3d01eddda5b842",
    measurementId: "G-SM4YZG7C1T"
  };

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();