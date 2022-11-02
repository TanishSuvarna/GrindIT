import React from "react";
import { Link } from "react-router-dom";
import "../css/mainsec2.css";
import { useState, useEffect } from "react";
import axios from "axios";
import profilelogo from "../utils/Images/profile_login.png";
export default function Mainsec2() {
  const [questions, setquestions] = useState();
  let id = localStorage.getItem("userId");
  const fetchDetails = async () => {
    const res = await axios(
      `http://localhost:5000/api/user/questions/${id}`
    ).catch((err) => console.log(err));
    const data = await res.data;

    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setquestions(data.message);
    });
  });

  return (
    <React.Fragment>
      <div className="mainsec_container">
        <div className="profile_div">
          <div className="profile_box">
            <img className="profile_img" src={profilelogo} alt="" />
            <label htmlFor="">{localStorage.getItem("Name")}</label>
          </div>
        </div>
        <div className="mainsec_container_wrapper">
          <div className="status_div">
            <div className="status_box">
              <p>Leet Code</p>
              <div className="status_nums">
                <div className="status_circle">12</div>
                <div className="status_circle">23</div>
                <div className="status_circle">34</div>
              </div>
              <div className="status_diff">
                <label htmlFor="">Easy</label>
                <label htmlFor="">Medium</label>
                <label htmlFor="">Hard</label>
              </div>
            </div>
            <div className="status_box">
              <p>Hacker Rank</p>
              <div className="status_nums">
                <div className="status_circle">12</div>
                <div className="status_circle">23</div>
                <div className="status_circle">34</div>
              </div>
              <div className="status_diff">
                <label htmlFor="">Easy</label>
                <label htmlFor="">Medium</label>
                <label htmlFor="">Hard</label>
              </div>
            </div>
            <div className="status_box">
              <p>Code Ninja</p>
              <div className="status_nums">
                <div className="status_circle">12</div>
                <div className="status_circle">23</div>
                <div className="status_circle">34</div>
              </div>
              <div className="status_diff">
                <label htmlFor="">Easy</label>
                <label htmlFor="">Medium</label>
                <label htmlFor="">Hard</label>
              </div>
            </div>
          </div>
          <div className="reminder_div">
            <div>
              <h1>Today's Reminders</h1>
            </div>
            {questions &&
              questions.map((ques, index) => (
                <a
                  className="question_link"
                  href={ques}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="reminder_box">
                    <label>Question {index + 1}</label>
                    <p>
                      {ques
                        .slice(29, ques.length + 1)
                        .split("-")
                        .join(" ")}
                    </p>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
