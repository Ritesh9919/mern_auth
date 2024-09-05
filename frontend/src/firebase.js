// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-5e84b.firebaseapp.com",
  projectId: "mern-auth-5e84b",
  storageBucket: "mern-auth-5e84b.appspot.com",
  messagingSenderId: "613731850702",
  appId: "1:613731850702:web:4787878d1d0122f703b39f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
