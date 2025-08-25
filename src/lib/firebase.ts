import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "suvidha-ocr-landing-page",
  "appId": "1:625631178267:web:e71052962b11989f11d2be",
  "storageBucket": "suvidha-ocr-landing-page.firebasestorage.app",
  "apiKey": "AIzaSyCXW3AiiqlP-pnk5FdKPsgxoiFksCj5VRM",
  "authDomain": "suvidha-ocr-landing-page.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "625631178267"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
