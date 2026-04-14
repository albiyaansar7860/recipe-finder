// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKwOn79M0eZAqgFNVUUM5sZSygH6BAUH4",
  authDomain: "recipe-finder-7831c.firebaseapp.com",
  projectId: "recipe-finder-7831c",
  storageBucket: "recipe-finder-7831c.firebasestorage.app",
  messagingSenderId: "661387829748",
  appId: "1:661387829748:web:f32d71ae999fdd29f6d9a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
