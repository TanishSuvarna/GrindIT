import React from "react";
import Login from "./login";
import Register from "./register";
import axios from "axios";
import { motion } from "framer-motion";
import "../css/land.css";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import Footer from "./Footer";
const Auth = ({ isSignUp, setisSignUp }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCrossed, setisCrossed] = useState(false);
  const [validLength, setValidLength] = useState(null);
  const [hasNumber, setHasNumber] = useState(null);

  const [upperCase, setUpperCase] = useState(null);
  const [lowerCase, setLowerCase] = useState(null);
  const [specialChar, setSpecialChar] = useState(null);
  const [eVal, seteVal] = useState(null);
  const [match, setMatch] = useState(null);
  const [isDisabled, setisDisabled] = useState(false);

  const [allInputs, setallInputs] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    leetCodeId: "",
    hackerRankId: "",
    codeNinjaId: "",
    phoneNumber: "",
  });
  const handleIt = (e) => {
    setallInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setValidLength(allInputs.password.length >= 8 ? true : false);
    setUpperCase(allInputs.password.toLowerCase() !== allInputs.password);
    setLowerCase(allInputs.password.toUpperCase() !== allInputs.password);
    setHasNumber(/\d/.test(allInputs.password));
    setMatch(
      allInputs.password && allInputs.password === allInputs.confirmPass
    );
    setSpecialChar(
      /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(allInputs.password)
    );
    seteVal(/([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g.test(allInputs.email));
    setisDisabled(
      validLength &&
        hasNumber &&
        upperCase &&
        lowerCase &&
        specialChar &&
        eVal &&
        match &&
        allInputs.name.length > 0 &&
        allInputs.phoneNumber.length === 10
    );
  }, [
    allInputs.password,
    allInputs.confirmPass,
    allInputs.email,
    allInputs.name,
    allInputs.phoneNumber,
  ]);
  useEffect(() => {
    setisDisabled(
      validLength &&
        hasNumber &&
        upperCase &&
        lowerCase &&
        specialChar &&
        eVal &&
        match &&
        allInputs.name.length > 0 &&
        allInputs.phoneNumber.length === 10
    );
  }, [validLength, upperCase, lowerCase, specialChar, eval, match, hasNumber]);
  const sendRequest = async (type) => {
    const user = {
      name: allInputs.name,
      email: allInputs.email,
      password: allInputs.password,
      leetcodeId: allInputs.leetCodeId,
      hackerRankId: allInputs.hackerRankId,
      codeNinjaId: allInputs.codeNinjaId,
      phoneNumber: allInputs.phoneNumber,
    };
    let res;
    try{
     res = await axios.post(`http://localhost:5000/api/user/${type}` ,user)
  }
    catch(err){
      setallInputs({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
        leetCodeId: "",
        hackerRankId: "",
        codeNinjaId: "",
        phoneNumber: "",
      });
      alert(err.response.data.message);
      return console.log(err);
    }
    const data = await res.data;
    localStorage.setItem("userId", data.newUser._id);
   if(data.newUser.leetcodeId.length)  localStorage.setItem("leetcodeId" , data.newUser.leetcodeId);
   else  localStorage.setItem("leetcodeId" , 'null');
   if(data.newUser.hackerRankId.length) localStorage.setItem("hackerrankId" , data.newUser.hackerRankId);
   else  localStorage.setItem("hackerrankId" , 'null');
   if(data.newUser.codeNinjaId.length) localStorage.setItem("codeforcesId" , data.newUser.codeNinjaId);
   else  localStorage.setItem("codeforcesId" , 'null');
  dispatch(authActions.login());
  navigate("/myProfile");
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    isSignUp ? sendRequest("signup") : sendRequest("login");
  };
  return (
    <>
      {isCrossed && (
        <div>
          {isSignUp ? (
            <Register
              eVal={eVal}
              match={match}
              isDisabled={isDisabled}
              specialChar={specialChar}
              hasNumber={hasNumber}
              upperCase={upperCase}
              lowerCase={lowerCase}
              validLength={validLength}
              setisSignUp={setisSignUp}
              setisCrossed={setisCrossed}
              handleSubmit={handleSubmit}
              setallInputs={setallInputs}
              allInputs={allInputs}
              handleIt={handleIt}
            />
          ) : (
            <>
              <Login
                setisSignUp={setisSignUp}
                handleSubmit={handleSubmit}
                setallInputs={setallInputs}
                allInputs={allInputs}
                handleIt={handleIt}
                setisCrossed={setisCrossed}
              />
            </>
          )}
        </div>
      )}

      <div>
        <div className="land_main_container">
          <div className="land_wrapper">
            <div className="land_nav">
              <div className="land_logo_div"></div>
              <div className="land_btn_div">
                <Link to="/auth">
                  <button
                    className="get_started"
                    onClick={(event) => {
                      setisSignUp(true);
                      setisCrossed(true);
                      console.log("crossed " + isCrossed);
                      console.log("signup " + isSignUp);
                    }}
                  >
                    Get Started for free
                  </button>
                </Link>
                <Link to="/auth">
                  <button
                    className="land_sign_btn"
                    onClick={(event) => {
                      setisSignUp(false);
                      setisCrossed(true);
                    }}
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
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", duration: 0.1 }}
                className="sec_3_box_1 sec_3_box"
              >
                <div className="land_sec_3_img_1"></div>
                <h1>Set Reminders</h1>
                <p>
                  Start with a free account and set a reminder for daily
                  questions on the topics that you desire.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", duration: 0.1 }}
                className="sec_3_box_2 sec_3_box"
              >
                <div className="land_sec_3_img_2"></div>
                <h1>Discuss Topics</h1>
                <p>
                  Discuss any topics with your pear developers and programmers
                  with our interactive discuss section.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", duration: 0.1 }}
                className="sec_3_box_3 sec_3_box"
              >
                <div className="land_sec_3_img_3"></div>
                <h1>Learn Topics</h1>
                <p>
                  With all the links of different topics in dsa you need not to
                  wander on internet to learn them.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
