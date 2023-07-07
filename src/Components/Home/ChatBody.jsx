import React, { useState, useEffect, useContext, useRef } from "react";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase-Config";
import { AuthContext } from "../../context/AuthContext";

const ChatBody = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const onSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      onSub();
    };
  }, [data.chatId]);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatBody">
      {messages?.map((msg) => (
        <div
          className={`userContainer ${
            msg.senderId === currentUser.uid && "reply"
          }`}
          key={msg.id}
          ref={ref}
        >
          <div className="userInfo">
            <img
              src={
                msg.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : data.user.photoURL
              }
              alt=""
            />
            <span>Just Now</span>
          </div>
          <div className="userContent">
            <span>{msg.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
