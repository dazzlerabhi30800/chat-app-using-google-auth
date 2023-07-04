import React, { useState } from "react";
import { db, auth } from "../Firebase-Config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function SendMessage() {
  const [msg, setMsg] = useState("");
  const messagesRef = collection(db, "demo");

  const sendMsg = async (e) => {
    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: msg,
      createdAt: serverTimestamp(),
      uid: uid,
      photoURL: photoURL,
    });
    setMsg("");
  };

  return (
    <div>
      <input
        placeholder="Message..."
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button onClick={sendMsg}>Send</button>
    </div>
  );
}

export default SendMessage;
