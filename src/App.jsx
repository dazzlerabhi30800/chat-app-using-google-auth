import React, { useContext } from "react";
import "./App.css";
import Register from "./Components/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home/Home";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route exact path="register" element={<Register />} />
          <Route exact path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
