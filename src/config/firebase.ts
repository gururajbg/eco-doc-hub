import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyDqlw5hkqXJNKNT-iRNbgR68_S2-hMavhw",

  authDomain: "ewasteweb.firebaseapp.com",

  projectId: "ewasteweb",

  storageBucket: "ewasteweb.firebasestorage.app",

  messagingSenderId: "115000058011",

  appId: "1:115000058011:web:d1411f518e39e2c220663e",

  measurementId: "G-GDGHY51MFM"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time
    console.warn('Firestore persistence failed: Multiple tabs open');
  } else if (err.code === 'unimplemented') {
    // The current browser doesn't support persistence
    console.warn('Firestore persistence not supported in this browser');
  }
}); 