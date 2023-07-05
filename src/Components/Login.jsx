import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../Firebase-Config";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    let credentials;
    try {
      credentials = await signInWithEmailAndPassword(auth, email, password);
      // console.log(credentials);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <main className="compContainer">
      <div className="formWrapper">
        <h1>Real Time Chat App</h1>
        <p>Login</p>
        <form>
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
          <button onClick={handleLogin} type="submit">
            Login
          </button>
        </form>
        <span>
          Don't have an Account <Link to="/register">Register</Link>
        </span>
      </div>
    </main>
  );
};

export default Login;
