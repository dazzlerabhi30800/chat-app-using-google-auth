import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, storage, db } from "../Firebase-Config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Resizer from "react-image-file-resizer";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const imageResizer = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(file, 50, 50, "PNG", 100, 0, (uri) => {
        resolve(uri);
      });
    });

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      let uri = await imageResizer(file);
      console.log(uri);

      const storageRef = ref(storage, displayName);

      const thumbsnapshot = await uploadString(storageRef, uri, "data_url");

      // const uploadTask = await uploadBytesResumable(storageRef, file);

      // await uploadBytesResumable(storageRef, thumbsnapshot.ref).then(() => {
      await getDownloadURL(thumbsnapshot.ref).then(async (downloadURL) => {
        console.log(downloadURL);
        try {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/");
        } catch (error) {
          console.log(error);
          setErr(true);
        }
      });
      // });
    } catch (error) {
      console.log(error);
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
