import React from "react";
import "./App.css";
import Register from "./Components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home/Home";
console.log("commit in windows");

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
