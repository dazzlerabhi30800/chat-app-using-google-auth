import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatBg from "./ChatBg";
import { getAuth } from "firebase/auth";

const Home = () => {
  const listAllUsers = (nextPageToken) => {
    getAuth()
      .listUsers(1000, nextPageToken)
      .then((listUserResult) => {
        listUserResult.users.forEach((user) => {
          console.log(user.toJSON());
        });
        if (listUserResult.pageToken) {
          listAllUsers(listUserResult.pageToken);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // listAllUsers();

  // useEffect(() => {
  //   listAllUsers();
  // }, []);

  return (
    <main className="compContainer homeContainer">
      <div className="mainWrapper">
        <Sidebar />
        <ChatBg />
      </div>
    </main>
  );
};

export default Home;
