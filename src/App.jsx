import React, { useEffect, useState } from "react";
import "./App.css";
import Register from "./Components/Register";
import {
  BrowserRouter as Router,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home/Home";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const auth = getAuth();
  const navigate = useNavigate();
  const authUser = auth.currentUser;
  const [user, setUser] = useState("");
  // console.log(auth);
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (user) {
        const uid = u.uid;
        setUser(user);
      } else {
        console.log("user is signed out");
        navigate("/login");
      }
    });
  }, []);
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home setUser={setUser} user={user} />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
