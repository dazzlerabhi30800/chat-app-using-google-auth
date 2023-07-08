import React, { useContext } from "react";
import { ChatContext } from "../../../context/ChatContext";

const ChatHeader = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chatHeaderWrapper">
      <h2>{data.user?.displayName}</h2>
      <div className="icons">
        <img src="./images/cam.png" alt="" />
        <img src="./images/more.png" alt="" />
        <img src="./images/add.png" alt="" />
      </div>
    </div>
  );
};

export default ChatHeader;
