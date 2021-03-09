import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuXCVw5A2AmjlRMva-duh9yE1qBcEYr70",
  authDomain: "paddleapp-1b7d9.firebaseapp.com",
  projectId: "paddleapp-1b7d9",
  storageBucket: "paddleapp-1b7d9.appspot.com",
  messagingSenderId: "645786909919",
  appId: "1:645786909919:web:97d6b3b57c678c9d453d6a",
  measurementId: "G-L7DMWZTV1Y",
};

export const firestore = firebase.firestore();

export default firebase;
