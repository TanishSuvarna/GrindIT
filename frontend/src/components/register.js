import React from "react";
import "../css/register.css";
import Logo from "../utils/Images/Logo.png";
import facebook from "../utils/socialLogo/facebook.png";
import instagram from "../utils/socialLogo/instagram.png";
import twitter from "../utils/socialLogo/twitter.png";
import youtube from "../utils/socialLogo/youtube.png";
const register = ({
  setisSignUp,
  handleSubmit,
  handleIt,
  setAllInputs,
  allInputs,
}) => {
  return (
    <div>
      <div class="main_container">
        <div class="register_div">
          <h1 class="register_heading">Create Account</h1>
          <form action="" class="register_form" onSubmit={handleSubmit}>
            <div class="container_form">
              <div class="left_form">
                <div class="register_box_container">
                  <label for="">Name</label>
                  <div class="register_box">
                    <input
                      class="inputs"
                      type="text"
                      value={allInputs.name}
                      onChange={handleIt}
                      placeholder="Name"
                      name="name"
                      id=""
                    />
                  </div>
                </div>
                <div class="register_box_container">
                  <label for="">Email</label>
                  <div class="register_box">
                    <input
                      class="inputs"
                      type="email"
                      value={allInputs.email}
                      onChange={handleIt}
                      placeholder="Email"
                      name="email"
                      id=""
                    />
                  </div>
                </div>
                <div class="register_box_container">
                  <label for="">Password</label>
                  <div class="register_box">
                    <input
                      class="inputs"
                      type="password"
                      value={allInputs.password}
                      onChange={handleIt}
                      placeholder="password"
                      name="password"
                      id=""
                    />
                  </div>
                </div>
                <div class="register_box_container">
                  <label for="">Confirm Password</label>
                  <div class="register_box">
                    <input
                      class="inputs"
                      type="text"
                      value={allInputs.password}
                      placeholder="Renter password"
                      name="none"
                      id=""
                    />
                  </div>
                </div>
              </div>
              <div class="division"></div>
              <div class="right_form">
                <div class="register_box_container">
                  <label for="">Phone Number</label>
                  <div class="register_box">
                    <input
                      class="inputs"
                      type="number"
                      value={allInputs.phoneNumber}
                      onChange={handleIt}
                      placeholder="PhoneNumber"
                      name="phoneNumber"
                      id=""
                    />
                  </div>
                </div>
                <div class="register_box_container">
                  <label for="">Leetcode Username</label>
                  <div class="register_box">
                    <input
                      class="inputs"
                      type="text"
                      value={allInputs.leetCodeId}
                      onChange={handleIt}
                      placeholder="Leetcode"
                      name="leetCodeId"
                      id=""
                    />
                  </div>
                </div>
                <div class="register_box_container">
                  <label for="">HackerRank username</label>
                  <div class="register_box">
                    <input
                      class="inputs"
                      type="text"
                      value={allInputs.hackerRankId}
                      onChange={handleIt}
                      placeholder="HackerRank"
                      name="hackerRankId"
                      id=""
                    />
                  </div>
                </div>
                <div class="register_box_container">
                  <label for="">Code Ninja username</label>
                  <div class="register_box">
                    <input
                      class="inputs"
                      type="text"
                      value={allInputs.codeNinjaId}
                      onChange={handleIt}
                      placeholder="CodeNinja"
                      name="codeNinjaId"
                      id=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <button id="submit_btn">Signup</button>
            <p style={{ color: "white" }}>
              Already have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setisSignUp(false)}
              >
                Login Here
              </span>
            </p>
          </form>
        </div>
      </div>

      <div class="footer">
        <div class="footer_wrapper">
          <img class="footer_logo" src={Logo} alt="" />
          <p>
            We provide a platform which will help you on your journey to crack
            your dream company. Practise daily with daily reminders of DSA
            Questions from famous websites like Leetcode , HackerRank , Code
            Ninja .
          </p>
        </div>
        <div class="socials">
          <a href="facebook.com">
            <img src={facebook} alt="" />
          </a>
          <a href="instagram.com">
            <img src={instagram} alt="" />
          </a>

          <a href="twitter.com">
            <img src={twitter} alt="" />
          </a>

          <a href="youtube.com">
            {" "}
            <img src={youtube} alt="" />
          </a>
        </div>
      </div>
      <div class="copyright">
        <p>Copyright © 2022 SudoKode</p>
      </div>
    </div>
  );
};

export default register;
