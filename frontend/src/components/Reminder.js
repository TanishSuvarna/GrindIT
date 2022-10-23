import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../css/reminder.css";
import axios from "axios";
import UserReminders from "./UserReminders";
import { Link } from "react-router-dom";
const Reminder = () => {
  const id = localStorage.getItem("userId");
  const [reminders, setreminders] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/reminders/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setreminders( data.message));
  }, []);
  console.log(reminders);

  // const [allreminders, setallreminders] = useState();
  // const sendRequest = async () => {
  //   const res = await axios
  //     .get("http://localhost:5000/api/reminders")
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };
  // useEffect(() => {
  //   sendRequest().then((data) => console.log(data));
  // });

  return (
    <>
      <div className="reminder-app">
        <div className="main-container">
          {reminders &&
            reminders.map((reminder, index) => (
              <UserReminders
                id={reminder._id}
                ourUser={localStorage.getItem("Name")}
                title={reminder.title}
                difficulty={reminder.difficulty}
                noofques={reminder.noofques}
                topic={reminder.topic}
              />
            ))}
          <Link to="/addReminder">
            <button className="add-reminder-btn">Add reminder </button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Reminder;
