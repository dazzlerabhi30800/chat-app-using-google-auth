import React, { useContext } from "react";
import { ChatContext } from "../../../context/ChatContext";

export const Users = ({ sortedChats }) => {
  const { dispatch } = useContext(ChatContext);
  const { data } = useContext(ChatContext);

  const handleChatSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };
  return (
    <div className="userWrapper">
      {sortedChats.map((chat) => (
        <div
          className={`user ${chat[0] === data?.chatId ? "active" : ""}`}
          key={chat[0]}
          onClick={() => handleChatSelect(chat[1].userInfo)}
        >
          <img
            className="fitImg"
            src={chat[1].userInfo.photoURL}
            alt={chat[1].userInfo.displayName}
          />
          <p className="name">{chat[1].userInfo.displayName}</p>
          <span className="lastMessage">{chat[1].lastMessage?.text}</span>
        </div>
      ))}
    </div>
  );
};
