import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="formContainer">
      <div className="formWrapper">
        <h1>Real Time Chat App</h1>
        <p>Login</p>
        <form>
          <input type="email" id="email" placeholder="Enter your email" />
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          <button onClick={(e) => e.preventDefault()} type="submit">
            Login
          </button>
        </form>
        <span>
          Don't have an Account <Link to="/">Register</Link>
        </span>
      </div>
    </main>
  );
};

export default Login;
