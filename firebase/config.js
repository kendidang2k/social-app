// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCQjg643tX0GyHWcbZbFEN6z4Gr1REQEJ0",
    authDomain: "social-app-9bf73.firebaseapp.com",
    projectId: "social-app-9bf73",
    storageBucket: "social-app-9bf73.appspot.com",
    messagingSenderId: "1052954814309",
    appId: "1:1052954814309:web:90c9d14a29f3032ad2238c",
    measurementId: "G-WWW57DF8R6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

connectAuthEmulator(auth, 'http://localhost:9099');
connectFirestoreEmulator(db, 'localhost', 8080);
connectStorageEmulator(storage, 'localhost', 9199);

export { db, auth, storage };

