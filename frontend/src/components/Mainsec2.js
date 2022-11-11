import React from "react";

import "../css/mainsec2.css";
import { useState, useEffect } from "react";
import axios from "axios";

import profilelogo from "../utils/Images/profile_login.png";

const Mainsec2 = ({ email, phonenumber, leetcodeId, hackerRankId }) => {
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

  const [leetId, setleetId] = useState(localStorage.getItem("leetcodeId"));
  const [change, setChange] = useState("");
  const [error, setError] = useState(false);
  const [dis, setdis] = useState();
  const handleChange = (e) => {
    setChange(e.target.value);
    setError(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setleetId(change);
  };
  useEffect(() => {
    const func = async () => {
      if (leetId !== null) {
        try {
          await axios
            .get(`http://localhost:5000/api/user/userData/${leetId}`)
            .then((data) => {
              if (data.data.allLeet) {
                localStorage.setItem("leetcodeId", leetId);
                localStorage.setItem(
                  "userData",
                  JSON.stringify(data.data.allLeet)
                );
                setdis(true);
              }
            });
        } catch (err) {
          localStorage.removeItem("userData");
          localStorage.setItem("leetcodeId", null);
          setError(true);
          setleetId(null);
          setChange("");
          return console.log(err);
        }
      } else {
        localStorage.setItem("leetcodeId", "null");
      }
    };

    func();
  }, [leetId]);

  return (
    <React.Fragment>
      <div className="mainsec_container">
        <div className="profile_div">
          <div className="profile_box">
            <img className="profile_img" src={profilelogo} alt="" />
            <label htmlFor="">{localStorage.getItem("Name")}</label>
          </div>

          <div className="black-line"></div>
          <div className="profile_stat_div">
            <div className="profile_stat_boxes">
              <div className="profile_box_img phone_img"></div>
              <p>
                Phone Number <span>{phonenumber}</span>
              </p>
            </div>

            <div className="profile_stat_boxes">
              <div className="profile_box_img email_img"></div>
              <p>
                Email <span>{email}</span>
              </p>
            </div>
            <div className="profile_stat_boxes">
              <div className="profile_box_img rank_img"></div>
              <p>
                Leet Code Rank <span>{}</span>
              </p>
            </div>

            <div className="profile_stat_boxes">
              <div className="profile_box_img leet_img"></div>
              <p>
                Leet Code id <span>{leetcodeId}</span>
              </p>
            </div>

            <div className="profile_stat_boxes">
              <div className="profile_box_img hacker_img"></div>
              <p>
                Hacker Rank id <span>{hackerRankId}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mainsec_container_wrapper">
          <div className="status_div">
            {dis ? (
              <div className="status_box">
                <p>Leet Code</p>
                <div className="status_nums">
                  <div className="status_circle">
                    {JSON.parse(localStorage.getItem("userData"))[1].count}
                  </div>
                  <div className="status_circle">
                    {JSON.parse(localStorage.getItem("userData"))[2].count}
                  </div>
                  <div className="status_circle">
                    {JSON.parse(localStorage.getItem("userData"))[3].count}
                  </div>
                </div>
                <div className="status_diff">
                  <label htmlFor="">Easy</label>
                  <label htmlFor="">Medium</label>
                  <label htmlFor="">Hard</label>
                </div>
              </div>
            ) : (
              <div className="status_div">
                <p>Enter Leet Code ID</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={change}
                    placeholder="Enter Leetcode Id"
                  />
                  <button type="submit">Submit</button>
                  <div style={{ fontSize: "10px", color: "red" }}>
                    {error && "Please Enter A Valid Leetcode Id"}
                  </div>
                </form>
              </div>
            )}
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
};
export default Mainsec2;
