import React from "react";
// import { auth } from "./firebase-config.js";
// import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import "./App.css";
import { Chat } from "./Components/Chat.jsx";
import SignIn from "./Components/SignIn.jsx";

function App() {
  let { currentUser } = getAuth();
  return <>{currentUser ? <Chat /> : <SignIn />}</>;
}

export default App;
