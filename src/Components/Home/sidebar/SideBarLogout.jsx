import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { signOut } from "firebase/auth";

export const SideBarLogout = () => {
  const { currentUser } = useContext(AuthContext);
  return (
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
  );
};
