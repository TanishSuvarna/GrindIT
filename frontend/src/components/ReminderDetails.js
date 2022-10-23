import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const ReminderDetails = () => {
  const navigate = useNavigate();
  const [reminder, setReminder] = useState();
  const id = useParams().id;
  const [inputs, setinputs] = useState({});

  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios(`http://localhost:5000/api/reminders/${id}`).catch(
      (err) => console.log(err)
    );
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setReminder(data.Reminder);
      setinputs({
        title: data.Reminder.title,
        difficulty: data.Reminder.difficulty,
        noofques: data.Reminder.noofques,
        topic: data.Reminder.topic,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/reminders/update/${id}`, {
        title: inputs.title,
        difficulty: inputs.difficulty,
        noofques: inputs.noofques,
        topic: inputs.topic,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  console.log(reminder);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/reminders/"));
  };

  return (
    <>
      {inputs && (
        <div className="add_reminder_container">
          <div className="reminder_img"></div>
          <div className="add_reminder_wrapper">
            <form
              onSubmit={handleSubmit}
              className="add_reminder_form"
              action=""
            >
              <h1>Edit Reminder</h1>
              <div className="add_reminder_form_wrapper">
                <label htmlFor="">Title</label>
                <input
                  name="title"
                  onChange={handleChange}
                  value={inputs.title}
                  placeholder="Enter a title for the Reminder"
                  type="text"
                />
                <label htmlFor="">Difficulty for Questions</label>
                <select
                  name="difficulty"
                  onChange={handleChange}
                  value={inputs.difficulty}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <label htmlFor="">No of Questions</label>
                <input
                  name="noofques"
                  onChange={handleChange}
                  value={inputs.noofques}
                  type="Number"
                />
                <label htmlFor="">Topic</label>
                <input
                  name="topic"
                  onChange={handleChange}
                  value={inputs.topic}
                  type="text"
                  placeholder="Enter a topic "
                />
                <div className="add_reminder_btn_div">
                  <button>Update Reminder</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default ReminderDetails;