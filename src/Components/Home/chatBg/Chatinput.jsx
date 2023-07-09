import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import {
  arrayUnion,
  Timestamp,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../../../Firebase-Config";
import { v4 as uuid } from "uuid";
import {
  uploadBytesResumable,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import Resizer from "react-image-file-resizer";

const Chatinput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const imageResizer = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(file, 400, 400, "PNG", 100, 0, (uri) => {
        resolve(uri);
      });
    });

  const handleSend = async () => {
    if (text.length < 1) return;
    if (img) {
      let uri = await imageResizer(img);
      const storageRef = ref(storage, uuid());

      const thumbsnapshot = await uploadString(storageRef, uri, "data_url");

      // await uploadBytesResumable(storageRef, img).then(() => {
      getDownloadURL(thumbsnapshot.ref).then(async (downloadURL) => {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          }),
        });
      });
      // });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };

  const sendMessageOnEnter = (e) => {
    e.keyCode === 13 && handleSend();
  };

  return (
    <div className="chatInput">
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
        onKeyDown={sendMessageOnEnter}
        id="chat-input"
        placeholder="Type something..."
      />
      <div className="send">
        <img src="./images/attach.png" alt="attach" />
        <input
          onChange={(e) => setImg(e.target.files[0])}
          type="file"
          id="file"
          style={{ display: "none" }}
        />
        <label htmlFor="file">
          <img src="./images/img.png" alt="file" />
        </label>
        <button onClick={handleSend} className="sendBtn">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatinput;
