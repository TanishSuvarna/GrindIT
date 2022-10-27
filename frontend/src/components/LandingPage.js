import React from "react";
import "../css/land.css";
import { Link } from "react-router-dom";
export default function LandingPage({ setisSignUp }) {
  return (
    <React.Fragment>
      <div className="land_main_container">
        <div className="land_wrapper">
          <div className="land_nav">
            <div className="land_logo_div"></div>
            <div className="land_btn_div">
              <Link to="/auth">
                <button
                  className="get_started"
                  onClick={() => setisSignUp(true)}
                >
                  Get Started for free
                </button>
              </Link>
              <Link to="/auth">
                <button
                  className="land_sign_btn"
                  onClick={() => setisSignUp(false)}
                >
                  Sign in
                </button>
              </Link>
            </div>
          </div>
          <div className="land_sec_2">
            <div className="land_sec_2_Rbox">
              <h1>A better way to practice for your tech Interview </h1>
              <p>
                practice DSA daily with us , discuss topics with your pears
                ,learn topics and much more{" "}
              </p>
              <button className="get_started">Get Started for free </button>
            </div>
            <div className="land_sec_2_Lbox"></div>
          </div>

          <div className="land_sec_3">
            <div className="sec_3_box_1 sec_3_box">
              <div className="land_sec_3_img_1"></div>
              <h1>Set Reminders</h1>
              <p>
                Start with a free account and set a reminder for daily questions
                on the topics that you desire.
              </p>
            </div>
            <div className="sec_3_box_2 sec_3_box">
              <div className="land_sec_3_img_2"></div>
              <h1>Discuss Topics</h1>
              <p>
                Discuss any topics with your pear developers and programmers
                with our interactive discuss section.
              </p>
            </div>
            <div className="sec_3_box_3 sec_3_box">
              <div className="land_sec_3_img_3"></div>
              <h1>Learn Topics</h1>
              <p>
                With all the links of different topics in dsa you need not to
                wander on internet to learn them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
