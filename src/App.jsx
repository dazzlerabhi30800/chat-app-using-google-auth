import React from "react";
import "./App.css";
import Register from "./Components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
