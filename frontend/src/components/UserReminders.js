import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/reminder.css";
import { Link } from "react-router-dom";
import AddRemider from "./AddReminders";
const UserReminders = ({
  id,
  ourUser,
  title,
  difficulty,
  reminders,
  setreminders,
  noofques,
  time,
  topic,
}) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`myReminders/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/reminders/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest().then((data) => {
      let remind;
      remind = reminders.filter((para) => {
        if (para._id !== id) {
          return para;
        }
      });
      console.log(remind);
      setreminders([...remind]);
    });
  };
  return (
    <>
      <div className="reminder_main_container">
        <div className="reminder">
          <div className="reminder-title-box">
            <h1 className="reminder-name">{title}</h1>
            <div className="black-line-reminder"></div>
          </div>

          <div className="reminder-details">
            <label>
              Difficulty: <span className="reminder-name">{difficulty}</span>
            </label>

            <label>
              No of Questions daily:{" "}
              <span className="reminder-name">{noofques}</span>
            </label>

            <label>
              Time set: <span className="reminder-name">{time}</span>
            </label>

            <label>
              Topic: <span className="reminder-name">{topic}</span>
            </label>
          </div>
        </div>
        <div className="reminder_update_btn">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default UserReminders;
