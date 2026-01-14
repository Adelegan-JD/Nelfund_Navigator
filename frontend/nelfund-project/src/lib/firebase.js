// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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
const db = getFirestore(app);

export { auth, analytics, db };
