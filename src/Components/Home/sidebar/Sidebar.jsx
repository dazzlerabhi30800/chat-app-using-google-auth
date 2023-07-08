import React, { useContext, useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../Firebase-Config";
import { AuthContext } from "../../../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../../context/ChatContext";
import { SideBarLogout } from "./SideBarLogout";
import { SearchUser } from "./SearchUser";
import { Users } from "./Users";

const Sidebar = () => {
  const [username, setUsername] = useState("");
  const [chats, setChats] = useState([]);

  const [sortedChats, setSortedChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

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

  const handleChatSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };
  return (
    <div className="sideBar">
      {/* Logout and Current user Display */}
      <SideBarLogout />
      {/* Search Bar to Search users */}
      <SearchUser setUsername={setUsername} username={username} />
      {/* Chat User Wrapper */}
      <Users sortedChats={sortedChats} />
    </div>
  );
};

export default Sidebar;
