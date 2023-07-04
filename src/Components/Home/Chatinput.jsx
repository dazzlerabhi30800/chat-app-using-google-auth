import React from "react";

const Chatinput = () => {
  return (
    <div className="chatInput">
      <input type="text" id="chat-input" placeholder="Type something..." />
      <div className="send">
        <img src="./images/attach.png" alt="attach" />
        <input type="file" id="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <img src="./images/img.png" alt="file" />
        </label>
        <button className="sendBtn">Send</button>
      </div>
    </div>
  );
};

export default Chatinput;
