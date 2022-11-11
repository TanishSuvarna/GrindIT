import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Mainsec2 from "./Mainsec2";
import axios from "axios";
import Footer from "./Footer";
const ProfilePage = () => {
  const [User, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => {
      console.log(data.message);
      setUser(data.message);
      console.log("message");
    });
  }, []);

  return (
    <React.Fragment>
      {User && (
        <Mainsec2
          email={User.email}
          phonenumber={User.phoneNumber}
          leetcodeId={User.leetcodeId}
          hackerRankId={User.hackerRankId}
        />
      )}
    </React.Fragment>
  );
};
export default ProfilePage;
