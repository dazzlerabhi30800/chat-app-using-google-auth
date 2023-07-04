import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main className="compContainer">
      <div className="formWrapper">
        <h1>Real Time Chat App</h1>
        <p>Register</p>
        <form>
          <input type="text" id="name" placeholder="Enter your username" />
          <input type="email" id="email" placeholder="Enter your email" />
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          <input type="file" id="fileUpload" />
          <label htmlFor="fileUpload">Upload your Avatar</label>
          <button onClick={(e) => e.preventDefault()} type="submit">
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
