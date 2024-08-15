// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// import {getFireBase}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY || "AIzaSyARQSdeaofvgniR5vu83bF6YdBil5EGAdQ",
  authDomain: process.env.FIREBASE_AUTHDOMAIN || "realtime-chatapp-f96b2.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECTID || "realtime-chatapp-f96b2",
  storageBucket: process.env.FIREBASE_STORAGEBUCKET || "realtime-chatapp-f96b2.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "216633340274",
  appId: process.env.FIREBASE_APPID || "1:216633340274:web:321496e46e6670a826adeb",
  measurementId: process.env.FIREBASE_MEASUREMENTID || "G-0Q5CTCYYYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };

