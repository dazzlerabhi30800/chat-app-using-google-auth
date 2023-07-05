import React from "react";

const Sidebar = ({ user }) => {
  return (
    <div className="sideBar">
      <div className="logout">
        <h1>user</h1>
        <button className="logoutBtn">Logout</button>
      </div>
      <div className="userWrapper">
        <div className="user logged">
          <img src={user.photoURL} alt={user.displayName} />
          <p className="name">{user.displayName}</p>
        </div>
        <div className="user">
          <img src="./images/user1.jpg" alt="Ricky Morty" />
          <p className="name">Ricky Morty</p>
        </div>
        <div className="user">
          <img src="./images/user3.jpg" alt="Cindrella" />
          <p className="name">Cindrella</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
