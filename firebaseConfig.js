// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCd5eDE1K5VPq6yHSZ0zJLaYujr3Hox9Q",
  authDomain: "my-app-8edc1.firebaseapp.com",
  projectId: "my-app-8edc1",
  storageBucket: "my-app-8edc1.appspot.com",
  messagingSenderId: "105021369657",
  appId: "1:105021369657:web:7974e4b18afb13beee8ce8",
  measurementId: "G-41JZPD8BFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = firebase.firestore();