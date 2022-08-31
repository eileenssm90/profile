// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRiIY-Tg3ulcXxkl4hOrj2BN2TD2b4O58",
  authDomain: "instagram-a459e.firebaseapp.com",
  projectId: "instagram-a459e",
  storageBucket: "instagram-a459e.appspot.com",
  messagingSenderId: "103558841551",
  appId: "1:103558841551:web:1f7f5b4f2a73f3960a63ba",
  databaseURL:
    "https://instagram-a459e-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the database service and export the reference for other modules
export const database = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
