// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH9T7MxYsGdYoQQUOuS4jv_OX4iquq_kk",
  authDomain: "nick-wensel-bio.firebaseapp.com",
  databaseURL: "https://nick-wensel-bio-default-rtdb.firebaseio.com",
  projectId: "nick-wensel-bio",
  storageBucket: "nick-wensel-bio.appspot.com",
  messagingSenderId: "237680088041",
  appId: "1:237680088041:web:546c5b5f76c631ed373178",
  measurementId: "G-VR9GH4YX7M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);

export { app, db };
