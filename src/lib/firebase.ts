// Import the functions you need from the SDKs you need
import { mock } from "@/app/mock-data";
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8SAYmYJRZ8DWZmYNrKSwZfRqIeU1_wHQ",
  authDomain: "coderstore-2ff0b.firebaseapp.com",
  projectId: "coderstore-2ff0b",
  storageBucket: "coderstore-2ff0b.appspot.com",
  messagingSenderId: "667566499282",
  appId: "1:667566499282:web:b446c84c24e1588342140b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);