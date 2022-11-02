import axios from "axios";
import React from "react";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";

import "../css/AddReminder.css";

const AddRemider = () => {
  const navigate = useNavigate();
  const [isDisabled,setisDisabled] = useState(false);
  const [inputs, setinputs] = useState({
    title: "",
    difficulty: "EASY",
    noofques: "",
    time: "",
    topic: "",
  });
  useEffect(() => {
    setisDisabled(inputs.title.length > 0 && inputs.noofques.length>0 && inputs.topic.length > 0 && inputs.time.length>0);
  }, [inputs.title,inputs.noofques,inputs.time,inputs.topic])
  
  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/reminders/add", {
        title: inputs.title,
        difficulty: inputs.difficulty,
        noofques: inputs.noofques,
        topic: inputs.topic,
        time: inputs.time,
        ourUser: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/reminders"));
  };

  return (
    <>
      <div className="add_reminder_container">
        <div className="reminder_img"></div>
        <div className="add_reminder_wrapper">
          <form onSubmit={handleSubmit} className="add_reminder_form" action="">
            <h1>Set a reminder</h1>
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
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
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
              <div className="add_reminder_btn_div" >
                <button disabled = {!isDisabled}>Add reminder</button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddRemider;
