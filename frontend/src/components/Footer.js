import React from "react";
import "../css/loginpage.css";
import facebook from "../utils/Images/facebook1.png";
import linked from "../utils/Images/linkedin1.png";
import gmail from "../utils/Images/gmail1.png";
import { motion } from "framer-motion";
const Footer = ({
  setisSignUp,
  handleSubmit,
  handleIt,
  setAllInputs,
  allInputs,
  setisCrossed,
}) => {
  return (
    <>
      <div
        style={{ backgroundColor: "black", height: "1000px" }}
        className="div"
      >
        Hello
      </div>
      <div className="main_main_container">
        <div className="main_login_container">
          <form action="" className="login_form" onSubmit={handleSubmit}>
            <h1 className="login_title">Login to Your Account</h1>
            <p className="login_social_title">Login using social networks.</p>
            <div className="socail_container">
              <img src={facebook} alt="" />
              <img src={gmail} alt="" />
              <img src={linked} alt="" />
            </div>
            <h5>
              <span>OR</span>
            </h5>
            <input
              className="login_inputs"
              type="email"
              value={allInputs.email}
              onChange={handleIt}
              placeholder="Email"
              name="email"
              id=""
            />
            <input
              className="login_inputs"
              type="password"
              value={allInputs.password}
              onChange={handleIt}
              placeholder="Password"
              name="password"
              id=""
            />

            <button className="login_submit">Sign in</button>
          </form>
          <div className="signup_image">
            <div class="cross_btn_div">
              <div class="cross_btn" onClick={() => setisCrossed(false)}></div>
            </div>
            <div className="div_signup">
              <h1 className="login_title">New Here?</h1>
              <p className="login_social_title">
                Sign up and discover a great amount of new apportunities!
              </p>
              <button className="signup_btn" onClick={() => setisSignUp(true)}>
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
