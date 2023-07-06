import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase-Config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <main className="compContainer">
      <div className="formWrapper">
        <h1>Real Time Chat App</h1>
        <p>Login</p>
        <form onSubmit={handleSubmit}>
          <input type="email" id="email" placeholder="Enter your email" />
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          <button type="submit">Login</button>
          {error && <span style={{ color: "red" }}>Something wen't wrong</span>}
        </form>
        <span>
          Don't have an Account <Link to="/register">Register</Link>
        </span>
      </div>
    </main>
  );
};

export default Login;
