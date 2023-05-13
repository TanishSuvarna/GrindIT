import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

import "../css/AddReminder.css";

const AddRemider = ({ setisCrossed, reminders, setreminders }) => {
  const [isDisabled, setisDisabled] = useState(false);
  const [inputs, setinputs] = useState({
    title: "",
    difficulty: "EASY",
    noofques: "",
    time: "",
    topic: "",
  });
  useEffect(() => {
    setisDisabled(
      inputs.title.length > 0 &&
        inputs.noofques.length > 0 &&
        inputs.topic.length > 0 &&
        inputs.time.length > 0
    );
  }, [inputs.title, inputs.noofques, inputs.time, inputs.topic]);

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
    setisCrossed(false);
    console.log(inputs);
    sendRequest().then((data) => {
      console.log(data);
      setreminders((prevreminder) => {
        return [...prevreminder, data.Reminder];
      });
    });
  };

  return (
    <>
      <div className="add_reminder_back">
        <div className="add_reminder_container">
          <div className="add_reminder_wrapper">
            <form
              onSubmit={handleSubmit}
              className="add_reminder_form"
              action=""
            >
              <div class="cross_btn_div">
                <div
                  class="cross_btn"
                  onClick={() => setisCrossed(false)}
                ></div>
              </div>
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
                <select
                  name="topic"
                  onChange={handleChange}
                  value={inputs.topic}
                  type="text"
                  placeholder="Enter a topic "
                >
                  <option value="hash-table">HashTable</option>
                  <option value="array">Array</option>
                  <option value="string">Strings</option>
                  <option value="dyanamic-programming">Dynamic Programming</option>
                  <option value="sorting">Sorting</option>
                  <option value="greedy">Greedy</option>
                  <option value="binary-search">BinarySearch</option>
                  <option value="binary-tree">Binary Tree</option>
                  <option value="two-pointers">Two Pointer</option>
                  <option value="prefix-sum">Prefix Sum</option>
                  <option value="stack">Stack</option>
                </select>
                
                <div className="add_reminder_btn_div">
                  <button disabled={!isDisabled}>Add reminder</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddRemider;
