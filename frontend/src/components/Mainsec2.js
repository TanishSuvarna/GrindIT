import React from "react";

import "../css/mainsec2.css";
import { useState, useEffect } from "react";
import axios from "axios";

import profilelogo from "../utils/Images/profile_login.png";

const Mainsec2 = ({
  uName,
  email,
  phonenumber,
  leetcodeId,
  hackerRankId,
  codeNinjaId,
}) => {
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
  }, []);

  const [leetId, setleetId] = useState(localStorage.getItem("leetcodeId"));
  const [hackId, setHackId] = useState(localStorage.getItem("hackerrankId"));
  const [codeId, setCodeId] = useState(localStorage.getItem("codeforcesId"));
  const [change, setChange] = useState("");
  const [change2, setChange2] = useState("");
  const [change3, setChange3] = useState("");
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [dis, setdis] = useState();
  const [dis2, setdis2] = useState();
  const [dis3, setdis3] = useState();
  const handleChange = (e) => {
    setChange(e.target.value);
    setError(false);
  };
  const handleChange2 = (e) => {
    setChange2(e.target.value);
    setError2(false);
  };
  const handleChange3 = (e) => {
    setChange3(e.target.value);
    setError3(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setleetId(change);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    setHackId(change2);
  };

  const handleSubmit3 = (e) => {
    e.preventDefault();
    setCodeId(change3);
  };
  useEffect(() => {
    const func = async () => {
      if (leetId !== "null") {
        try {
          await axios
            .get(`http://localhost:5000/api/user/userData/leetcode/${leetId}`)
            .then((data) => {
              if (data.data.allLeet) {
                localStorage.setItem("leetcodeId", leetId);
                localStorage.setItem(
                  "leetData",
                  JSON.stringify(data.data.allLeet)
                );
                localStorage.setItem("leetRanking", data.data.ranking1);
                setdis(true);
              }
            });
        } catch (err) {
          localStorage.removeItem("leetData");
          localStorage.setItem("leetcodeId", "null");
          setError(true);
          setleetId("");
          setChange("");
          return console.log(err);
        }
      } else {
        localStorage.setItem("leetcodeId", "null");
      }
    };
    func();
  }, [leetId]);

  useEffect(() => {
    const func = async () => {
      if (hackId !== "null") {
        try {
          await axios
            .get(`http://localhost:5000/api/user/userData/hackerrank/${hackId}`)
            .then((data) => {
              localStorage.setItem("hackerrankId", hackId);
              localStorage.setItem("hackData", data.data.totalQues);
              // localStorage.setItem("hackData" ,JSON.stringify(data.data.allQues))
              setdis2(true);
            });
        } catch (err) {
          localStorage.removeItem("hackData");
          localStorage.setItem("hackerrankId", "null");
          setError2(true);
          setHackId("");
          setChange2("");
          return console.log(err);
        }
      } else {
        localStorage.setItem("hackerrankId", "null");
      }
    };

    func();
  }, [hackId]);

  useEffect(() => {
    const func = async () => {
      if (codeId !== "null") {
        try {
          await axios
            .get(`http://localhost:5000/api/user/userData/codeforces/${codeId}`)
            .then((data) => {
              localStorage.setItem("codeforcesId", codeId);
              localStorage.setItem("codeData", JSON.stringify(data.data));
              setdis3(true);
            });
        } catch (err) {
          localStorage.removeItem("codeData");
          localStorage.setItem("codeforcesId", "null");
          setError3(true);
          setCodeId("");
          setChange3("");
          return console.log(err);
        }
      } else {
        localStorage.setItem("codeforcesId", "null");
      }
    };
    func();
  }, [codeId]);

  return (
    <React.Fragment>
      <div className="mainsec_container">
        <div className="profile_div">
          <div className="profile_box">
            <img className="profile_img" src={profilelogo} alt="" />
            <label htmlFor="">{uName}</label>
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

            {localStorage.getItem("leetcodeId") &&
              localStorage.getItem("leetId") !== "null" && (
                <div className="profile_stat_boxes">
                  <div className="profile_box_img leet_img"></div>
                  <p>
                    LeetCode Id{" "}
                    <span> {localStorage.getItem("leetcodeId")}</span>
                  </p>
                </div>
              )}

            {localStorage.getItem("leetRanking") && (
              <div className="profile_stat_boxes">
                <div className="profile_box_img rank_img"></div>
                <p>
                  LeetCode Rank{" "}
                  <span>{localStorage.getItem("leetRanking")}</span>
                </p>
              </div>
            )}

            {localStorage.getItem("hackerrankId") &&
              localStorage.getItem("hackerrankId") !== "null" && (
                <div className="profile_stat_boxes">
                  <div className="profile_box_img hacker_img"></div>
                  <p>
                    HackerRank Id{" "}
                    <span> {localStorage.getItem("hackerrankId")}</span>
                  </p>
                </div>
              )}
            {localStorage.getItem("codeforcesId") &&
              localStorage.getItem("codeforcesId") !== "null" && (
                <div className="profile_stat_boxes">
                  <div className="profile_box_img codeforces_img"></div>
                  <p>
                    CodeForces Id{" "}
                    <span>{localStorage.getItem("codeforcesId")}</span>
                  </p>
                </div>
              )}
            {localStorage.getItem("codeData") && (
              <div className="profile_stat_boxes">
                <div className="profile_box_img codeforces_img"></div>
                <p>
                  CodeForces Rating
                  <span>
                    {" "}
                    {JSON.parse(localStorage.getItem("codeData")).rating}
                  </span>
                </p>
              </div>
            )}

            {localStorage.getItem("codeData") && (
              <div className="profile_stat_boxes">
                <div className="profile_box_img codeforces_img"></div>
                <p>
                  CodeForces Rank
                  <span>
                    {" "}
                    {JSON.parse(localStorage.getItem("codeData")).rank}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mainsec_container_wrapper">
          <div className="status_div">
            {dis ? (
              <div className="status_box">
                <p>Leet Code</p>
                <div className="status_nums">
                  <div className="status_circle">
                    {JSON.parse(localStorage.getItem("leetData"))[1].count}
                  </div>
                  <div className="status_circle">
                    {JSON.parse(localStorage.getItem("leetData"))[2].count}
                  </div>
                  <div className="status_circle">
                    {JSON.parse(localStorage.getItem("leetData"))[3].count}
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
            {dis2 ? (
              <div className="status_box">
                <p>Hacker Rank</p>
                <div className="status_nums">
                  {/* <div className="status_circle">12</div> */}
                  <div className="status_circle">
                    {localStorage.getItem("hackData")}
                  </div>
                  {/* <div className="status_circle">34</div> */}
                </div>
                <div className="status_diff">
                  {/* <label htmlFor="">Easy</label> */}
                  <label htmlFor="">Total Solved</label>
                  {/* <label htmlFor="">Hard</label> */}
                </div>
              </div>
            ) : (
              <div className="status_div">
                <p>Enter Hackerrank ID</p>
                <form onSubmit={handleSubmit2}>
                  <input
                    type="text"
                    onChange={handleChange2}
                    value={change2}
                    placeholder="Enter Hackerrank Id"
                  />
                  <button type="submit">Submit</button>
                  <div style={{ fontSize: "10px", color: "red" }}>
                    {error2 && "Please Enter A Valid Hackerrank Id"}
                  </div>
                </form>
              </div>
            )}
            {dis3 ? (
              <div className="status_box">
                <p>CodeForces</p>
                <div className="status_nums">
                  <div className="status_circle">
                    {JSON.parse(localStorage.getItem("codeData")).easy}
                  </div>
                  <div className="status_circle">
                    {JSON.parse(localStorage.getItem("codeData")).medium}
                  </div>
                  <div className="status_circle">
                    {JSON.parse(localStorage.getItem("codeData")).hard}
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
                <p>Enter CodeForces ID</p>
                <form onSubmit={handleSubmit3}>
                  <input
                    type="text"
                    onChange={handleChange3}
                    value={change3}
                    placeholder="Enter Hackerrank Id"
                  />
                  <button type="submit">Submit</button>
                  <div style={{ fontSize: "10px", color: "red" }}>
                    {error3 && "Please Enter A Valid CodeForces Id"}
                  </div>
                </form>
              </div>
            )}
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
