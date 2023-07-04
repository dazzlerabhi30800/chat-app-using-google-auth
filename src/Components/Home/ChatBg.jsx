import React from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import Chatinput from "./Chatinput";

const ChatBg = () => {
  return (
    <div className="chatWrapper">
      <ChatHeader />
      <ChatBody />
      <Chatinput />
    </div>
  );
};

export default ChatBg;
