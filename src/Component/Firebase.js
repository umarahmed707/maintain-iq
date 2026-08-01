import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5x0ZWujIg2C26irXsI5koRSTe8JiFLUY",
  authDomain: "maintainceiq.firebaseapp.com",
  projectId: "maintainceiq",
  storageBucket: "maintainceiq.firebasestorage.app",
  messagingSenderId: "919874475866",
  appId: "1:919874475866:web:c883521f68e2aae3950563"
};

const app = initializeApp(firebaseConfig);

// Firebase Services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Agar app bhi kahin use karte ho
export default app;