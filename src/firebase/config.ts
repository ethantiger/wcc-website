// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP38Vs4QigmYRKCGmdIaq-NgJ_aVCPZp4",
  authDomain: "wcc-website-1ea11.firebaseapp.com",
  projectId: "wcc-website-1ea11",
  storageBucket: "wcc-website-1ea11.firebasestorage.app",
  messagingSenderId: "797854070317",
  appId: "1:797854070317:web:a56738266726ccc8baaaa4",
  measurementId: "G-1W1D2LCWGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore();
const auth = getAuth();

export { db, auth, analytics }