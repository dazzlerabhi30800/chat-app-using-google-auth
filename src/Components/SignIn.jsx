import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Firebase-Config";

const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
      <h1>Hello this is a signin component</h1>
    </div>
  );
};

export default SignIn;
