import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/reminder.css";
const UserReminders = ({ id, ourUser, title, difficulty, noofques, topic }) => {
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
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/reminders"));
  };
  return (
    <>
      <div className="reminder_main_container">
        <div className="reminder">
          <label htmlFor="">
            UserName: <span className="reminder-name">{ourUser}</span>
          </label>
          <br />
          <label>
            Title: <span className="reminder-name">{title}</span>
          </label>
          <br></br>
          <label>
            Difficulty: <span className="reminder-name">{difficulty}</span>
          </label>
          <br></br>
          <label>
            No of Questions: <span className="reminder-name">{noofques}</span>
          </label>
          <br></br>
          <label>
            Topic: <span className="reminder-name">{topic}</span>
          </label>
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
