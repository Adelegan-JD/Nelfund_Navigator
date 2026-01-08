// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdsl0hyAB-_duJUse77sdo7I0N-UH96jA",
  authDomain: "nelfundai.firebaseapp.com",
  projectId: "nelfundai",
  storageBucket: "nelfundai.firebasestorage.app",
  messagingSenderId: "1009301061418",
  appId: "1:1009301061418:web:fc5c2d456ff1ebbc07a853",
  measurementId: "G-D4Z84Y1TFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
