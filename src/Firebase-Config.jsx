import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa9rlPtYU2id6zsLO5BX2uwLiwan8XRUE",
  authDomain: "chat-app-6eb15.firebaseapp.com",
  projectId: "chat-app-6eb15",
  storageBucket: "chat-app-6eb15.appspot.com",
  messagingSenderId: "385979646779",
  appId: "1:385979646779:web:65ea615de7af1c95cd2d1e",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
