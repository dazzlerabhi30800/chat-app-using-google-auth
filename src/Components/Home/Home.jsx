import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatBg from "./ChatBg";

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
