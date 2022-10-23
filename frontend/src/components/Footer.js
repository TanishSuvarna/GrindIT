import React from "react";
import "../css/footer.css";
import logo from "../utils/Images/logo2.png";
import facebook from "../utils/socialLogo/facebook.png";
import instagram from "../utils/socialLogo/instagram.png";
import twitter from "../utils/socialLogo/twitter.png";
import youtube from "../utils/socialLogo/youtube.png";

export default function Footer() {
  return (
    <React.Fragment>
      <div class="main_footer">
        <div class="main_footer_wrapper">
          <img class="main_footer_logo" src={logo} alt="" />

          <p>
            We provide a platform which will help you on your journey to crack
            your dream company. Practise daily with daily reminders of DSA
            Questions from famous websites like Leetcode , HackerRank , Code
            Ninja .
          </p>
        </div>

        <div class="main_footer_socials">
          <a href="">
            <img src={facebook} alt="" />
          </a>
          <a href="">
            <img src={instagram} alt="" />
          </a>

          <a href="">
            <img src={youtube} alt="" />
          </a>

          <a href="">
            {" "}
            <img src={twitter} alt="" />
          </a>
        </div>
      </div>
      <div class="main_footer_copyright">
        <p>Copyright © 2022 SudoKode</p>
      </div>
    </React.Fragment>
  );
}
