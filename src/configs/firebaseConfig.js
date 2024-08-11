// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// import {getFireBase}

const firebaseConfig = {
  apiKey: "AIzaSyARQSdeaofvgniR5vu83bF6YdBil5EGAdQ",
  authDomain: "realtime-chatapp-f96b2.firebaseapp.com",
  projectId: "realtime-chatapp-f96b2",
  storageBucket: "realtime-chatapp-f96b2.appspot.com",
  messagingSenderId: "216633340274",
  appId: "1:216633340274:web:321496e46e6670a826adeb",
  measurementId: "G-0Q5CTCYYYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };

