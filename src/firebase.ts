import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC2b2VrMuiuf1Dq_5_y-rv2AhNXO2wZM0U",
  authDomain: "portfolio-5feaf.firebaseapp.com",
  projectId: "portfolio-5feaf",
  storageBucket: "portfolio-5feaf.firebasestorage.app",
  messagingSenderId: "836678287499",
  appId: "1:836678287499:web:54ffb06ef298892392948e",
  measurementId: "G-8BKEFP5BQ8"
};

const app = initializeApp(firebaseConfig);
const databaseId = import.meta.env.VITE_FIREBASEDATABASE_ID || "default";
export const db = getFirestore(app, databaseId);
export const auth = getAuth(app);

// Only initialize analytics if window is defined (client-side)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
