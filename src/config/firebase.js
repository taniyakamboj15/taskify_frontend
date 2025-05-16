// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdy5tt2Y57LQ_K2n_jXWrF0I9_0h7Wqfs",
  authDomain: "taskify-28ba1.firebaseapp.com",
  projectId: "taskify-28ba1",
  storageBucket: "taskify-28ba1.firebasestorage.app",
  messagingSenderId: "953983670679",
  appId: "1:953983670679:web:3d6fcae10eabe9e7c20cd2",
  measurementId: "G-FHLXX39PT3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();
  return token;
};
