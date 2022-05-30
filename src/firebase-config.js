// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbFGhFnCdPbYQ06zLC4DortO8O7A-yrQg",
  authDomain: "booking-hotel-f5eec.firebaseapp.com",
  projectId: "booking-hotel-f5eec",
  storageBucket: "booking-hotel-f5eec.appspot.com",
  messagingSenderId: "790380378058",
  appId: "1:790380378058:web:2da3791c487eed0599c133",
  measurementId: "G-6EJQ6K9772",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
