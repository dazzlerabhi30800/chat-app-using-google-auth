import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, storage, db } from "../Firebase-Config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [err, setErr] = useState(false);

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log(file);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL);
            await updateProfile(res.user, {
              displayName,
              photoURl: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
    } catch (error) {
      // console.log(error);
      setErr(true);
    }
  };

  return (
    <main className="compContainer">
      <div className="formWrapper">
        <h1>Real Time Chat App</h1>
        <p>Register</p>
        <form onSubmit={handleSubmit}>
          <input type="text" id="name" placeholder="Enter your username" />
          <input type="email" id="email" placeholder="Enter your email" />
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          <input type="file" id="fileUpload" />
          <label htmlFor="fileUpload">Upload your Avatar</label>
          <button type="submit">Register</button>
        </form>
        {err && <span style={{ color: "red" }}>Something wen't wrong</span>}
        <span>
          Already have Account <Link to="/login">Login</Link>
        </span>
      </div>
    </main>
  );
};

export default Register;
