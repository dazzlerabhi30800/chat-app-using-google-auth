import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatBg from "./ChatBg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <main className="compContainer homeContainer">
      <div className="mainWrapper">
        <Sidebar />
        <ChatBg />
      </div>
    </main>
  );
};

export default Home;
