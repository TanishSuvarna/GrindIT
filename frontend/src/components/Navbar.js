import React from "react";
import "../css/Navbar.css";

import logo from "../utils/Images/logo2.png";

import streakpoints from "../utils/Images/StreakPoints.png";
import profilelogo from "../utils/Images/profileLogo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store";
export default function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <div className="section_1">
      <div className="nav_wrapper">
        <div className="nav_bar">
          <div className="logo_div">
            <img className="logo" src={logo} alt="" />
          </div>

          <div className="nav_bar_div_2">
            <ul>
              <li className="nav_bar_links">
                <Link to="/myProfile" href="">
                  Home
                </Link>{" "}
              </li>

              <li className="nav_bar_links">
                <Link to="/blogs" href="">
                  Discuss
                </Link>
              </li>
              <li className="nav_bar_links">
                <Link to="/reminders" href="">
                  Reminders
                </Link>
              </li>
              <li className="nav_bar_links">
                <Link to="/myBlogs" href="">
                  MyPosts
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav_bar_div_3">
            <a href="/">
              {" "}
              <img className="profile_pic" src={streakpoints} alt="" />{" "}
            </a>
            <a href="/">
              {" "}
              <img className="profile_pic" src={profilelogo} alt="" />{" "}
            </a>
            {isLoggedIn && (
              <Link to={"/auth"}>
                <button
                  onClick={() => dispatch(authActions.logout())}
                  className="nav_logout_btn"
                >
                  Logout
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
