<<<<<<< HEAD
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
=======
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
const app = initializeApp(firebaseConfig);
>>>>>>> 4e448c5 (initial commit in windows)
