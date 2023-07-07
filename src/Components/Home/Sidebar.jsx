import React, { useContext, useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../Firebase-Config";
import { AuthContext } from "../../context/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");
  const [chats, setChats] = useState([]);

  const [sortedChats, setSortedChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  useEffect(() => {
    setSortedChats(
      Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date)
    );
  }, [chats]);

  // console.log(sortedChats);
  // console.log(data);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  const handleKeyDown = (e) => {
    e.keyCode === 13 && handleSearch();
  };

  const handleSelect = async () => {
    // check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    setUsername("");
  };

  const handleChatSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };
  return (
    <div className="sideBar">
      {/* Logout and Current user Display */}
      <div className="logout">
        <h1>Chattty</h1>
        <div className="loggedUser">
          <img
            src={currentUser.photoURL}
            className="fitImg"
            alt={currentUser.displayName}
          />
          <span>{currentUser.displayName}</span>
          <button onClick={() => signOut(auth)} className="logoutBtn">
            Logout
          </button>
        </div>
      </div>
      {/* Search Bar to Search users */}
      <div className="searchUsers">
        <div className="searchForm">
          <input
            onKeyDown={handleKeyDown}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Find a User"
          />
        </div>
        {err && <span>User not found</span>}
        {user && (
          <div className="userChat" onClick={handleSelect}>
            <img
              className="fitImg"
              src={user.photoURL}
              alt={user.displayName}
            />
            <div className="chatInfo">{user.displayName}</div>
          </div>
        )}
      </div>

      {/* Chat User Wrapper */}
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
    </div>
  );
};

export default Sidebar;
