// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy3aNMAscbEacNjFEIg7nYKnpMwJZHWJg",
  authDomain: "financely-bc813.firebaseapp.com",
  projectId: "financely-bc813",
  storageBucket: "financely-bc813.appspot.com",
  messagingSenderId: "846052082602",
  appId: "1:846052082602:web:841d61805277c8a47c61d3",
  measurementId: "G-YPQ75244TK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
