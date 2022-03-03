// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQjg643tX0GyHWcbZbFEN6z4Gr1REQEJ0",
    authDomain: "social-app-9bf73.firebaseapp.com",
    projectId: "social-app-9bf73",
    storageBucket: "social-app-9bf73.appspot.com",
    messagingSenderId: "1052954814309",
    appId: "1:1052954814309:web:69d3cf92d2e89b69d2238c",
    measurementId: "G-8TZZ6DKXXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);