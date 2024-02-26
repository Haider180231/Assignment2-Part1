// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId} from "@env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;

isSupported().then((isSupported) => {
  if (isSupported) {
    analytics = getAnalytics(app);
  } else {
    console.log("Firebase Analytics is not supported in this environment");
  }
});
// const analytics = getAnalytics(app);
export const db = getFirestore(app);