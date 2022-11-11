import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ReminderDetails = () => {
  const navigate = useNavigate();
  const [reminder, setReminder] = useState();
  const [isDisabled, setisDisabled] = useState(true);
  const id = useParams().id;
  const [inputs, setinputs] = useState({
    title: "",
    noofques: "",
    time: "",
    topic: "",
  });
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
        time: data.Reminder.time,
        topic: data.Reminder.topic,
      });
    });
  }, [id]);
  useEffect(() => {
    setisDisabled(
      inputs.title.length > 0 &&
        inputs.noofques > 0 &&
        inputs.topic.length > 0 &&
        inputs.time.length > 0
    );
  }, [inputs.title, inputs.noofques, inputs.time, inputs.topic]);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/reminders/update/${id}`, {
        title: inputs.title,
        difficulty: inputs.difficulty,
        noofques: inputs.noofques,
        time: inputs.time,
        topic: inputs.topic,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HARD">HARD</option>
                </select>
                <label htmlFor="">No of Questions</label>
                <input
                  name="noofques"
                  onChange={handleChange}
                  value={inputs.noofques}
                  type="Number"
                />
                <label htmlFor="">Set Time</label>

                <input
                  type="time"
                  name="time"
                  onChange={handleChange}
                  value={inputs.time}
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
                  <button disabled={!isDisabled}>Update Reminder</button>
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
