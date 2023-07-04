import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGSI16Xnnt7cKY3PsXsitETFrDg3B6nhI",
  authDomain: "chat-app-4bfc9.firebaseapp.com",
  projectId: "chat-app-4bfc9",
  storageBucket: "chat-app-4bfc9.appspot.com",
  messagingSenderId: "693451129699",
  appId: "1:693451129699:web:0f74e9bbb35b9aedf2c956",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
