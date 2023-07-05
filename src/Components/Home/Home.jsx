import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatBg from "./ChatBg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = ({ user, setUser }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        const uid = u.uid;
        console.log(u);
        setUser(u);
      } else {
        console.log("user is signed out");
        navigate("/login");
      }
    });
  }, []);
  return (
    <main className="compContainer homeContainer">
      <div className="mainWrapper">
        <Sidebar user={user} />
        <ChatBg />
      </div>
    </main>
  );
};

export default Home;
