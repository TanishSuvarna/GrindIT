import React from "react";
import "../css/mainsec2.css";

import profilelogo from "../utils/Images/profile_login.png";
export default function Mainsec2() {
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
            <div className="reminder_box">
              <label>Question 1</label>
              <p>
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled i
              </p>
            </div>
            <div className="reminder_box">
              <label>Question 1</label>
              <p>
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled i
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
