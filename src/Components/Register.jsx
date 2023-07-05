import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const auth = getAuth();

  const handleNewUser = async (e) => {
    e.preventDefault();
    let newUser = await createUserWithEmailAndPassword(auth, email, password);
    if (newUser) {
      auth.currentUser.displayName = userName;
      auth.currentUser.photoURL = avatar;
      // console.log(auth.currentUser);
      navigate("/");
    }
  };

  return (
    <main className="compContainer">
      <div className="formWrapper">
        <h1>Real Time Chat App</h1>
        <p>Register</p>
        <form>
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            id="name"
            placeholder="Enter your username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          <input
            onChange={(e) => setAvatar(e.target.value)}
            value={avatar}
            type="file"
            id="fileUpload"
          />
          <label htmlFor="fileUpload">
            {avatar ? avatar : "Upload Your Avatar"}
          </label>
          <button onClick={handleNewUser} type="submit">
            Register
          </button>
        </form>
        <span>
          Already have Account <Link to="/login">Login</Link>
        </span>
      </div>
    </main>
  );
};

export default Register;
