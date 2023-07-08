import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import Sidebar from "./sidebar/Sidebar";
import ChatBg from "./chatBg/ChatBg";

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
