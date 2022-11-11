import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Mainsec2 from "./Mainsec2";
import axios from "axios";
import Footer from "./Footer";
import LoaderScreen from "./LoaderScreen";
const ProfilePage = () => {
  const [User, setUser] = useState();
  const [isLoading, setisLoading] = useState(true);
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
      setUser(data.message);
    });
  }, []);

  return (
    <>
      {isLoading && <LoaderScreen setisLoading={setisLoading}></LoaderScreen>}
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
    </>
  );
};
export default ProfilePage;
