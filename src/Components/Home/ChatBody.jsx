import React from "react";

const ChatBody = () => {
  return (
    <div className="chatBody">
      <div className="userContainer reply">
        <div className="userInfo">
          <img src="./images/user1.jpg" alt="" />
          <span>Just Now</span>
        </div>
        <div className="userContent">
          <span>Hello</span>
        </div>
      </div>
      <div className="userContainer">
        <div className="userInfo">
          <img src="./images/user2.jpg" alt="" />
          <span>Just Now</span>
        </div>
        <div className="userContent">
          <span>Aur Bsdk kaisa h?</span>
        </div>
      </div>
      <div className="userContainer reply">
        <div className="userInfo">
          <img src="./images/user1.jpg" alt="" />
          <span>Just Now</span>
        </div>
        <div className="userContent">
          <span>Btau Saale apni aukat mein rhe</span>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
