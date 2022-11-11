import React from "react";
import "../css/register.css";
import "react-phone-input-2/lib/style.css";
import { motion } from "framer-motion";

const register = ({
  setisSignUp,
  handleSubmit,
  handleIt,
  setAllInputs,
  allInputs,
  validLength,
  hasNumber,
  upperCase,
  lowerCase,
  match,
  specialChar,
  setisCrossed,
  eVal,
  isDisabled,
}) => {
  return (
    <>
      <div className="main_main_register_container">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ type: "spring", duration: 0.3 }}
          exit={{ x: window.innerWidth }}
          class="main_register_container"
        >
          <div className="register_contianer">
            <div class="register_signup_image">
              <div class="register_div_signup">
                <h1>Already have an Account !</h1>
                <p>Sign in here</p>
                <button
                  class="register_signup_btn"
                  onClick={() => {
                    setisSignUp(false);
                    setisCrossed(true);
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
            <form action="" class="register_form" onsubmit={handleSubmit}>
              <div class="register_cross_btn_div">
                <div
                  class="register_cross_btn"
                  onClick={() => {
                    setisCrossed(false);
                  }}
                ></div>
              </div>
              <h1 class="register_title">Create Your free Account</h1>

              <p class="register_social_title">
                Please provide the following fields
              </p>
              <div class="register_inputs_main_container">
                <div class="register_input_divs">
                  <div>
                    <input
                      class="register_inputs"
                      value={allInputs.name}
                      onChange={handleIt}
                      type="text"
                      name="name"
                      placeholder="Username"
                      id=""
                    />
                    <div style={{ fontSize: "12px", color: "red" }}>
                      {allInputs.name.length === 0 && "Please Enter Your Name"}
                    </div>
                  </div>
                  <div>
                    <input
                      class="register_inputs"
                      type="email"
                      value={allInputs.email}
                      onChange={handleIt}
                      placeholder="Email"
                      name="email"
                      id=""
                    />
                    <div style={{ fontSize: "12px", color: "red" }}>
                      {!eVal &&
                        allInputs.email.length > 0 &&
                        "Enter A Valid Email"}
                    </div>
                  </div>
                  <div className="password_div">
                    <input
                      class="register_inputs"
                      type="password"
                      value={allInputs.password}
                      onChange={handleIt}
                      placeholder="password"
                      name="password"
                      id=""
                    />

                    {!validLength ? (
                      <div style={{ fontSize: "12px", color: "red" }}>
                        {allInputs.password.length > 0 &&
                          "Minimum Length Of The Password Should Be 8"}
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          fontSize: "12px",
                          color: "red",
                        }}
                      >
                        {(!hasNumber ||
                          !upperCase ||
                          !lowerCase ||
                          !specialChar) &&
                          "Password Must Include uppercase, lowercase, number, special character"}
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      class="register_inputs"
                      type="password"
                      value={allInputs.confirmPass}
                      onChange={handleIt}
                      placeholder="Renter password"
                      name="confirmPass"
                      id=""
                    />
                    <div style={{ fontSize: "12px", color: "red" }}>
                      {allInputs.password.length > 0 &&
                        !match &&
                        "Password Don't Match"}
                    </div>
                  </div>
                </div>

                <div class="register_input_divs">
                  <div>
                    <input
                      class="register_inputs"
                      type="number"
                      value={allInputs.phoneNumber}
                      onChange={handleIt}
                      placeholder="PhoneNumber"
                      name="phoneNumber"
                      id=""
                    />
                    <div style={{ fontSize: "12px", color: "red" }}>
                      {allInputs.phoneNumber.length > 0 &&
                        allInputs.phoneNumber.length !== 10 &&
                        "Please Enter A Valid Phone Number"}
                    </div>
                  </div>
                  <div>
                    <input
                      class="register_inputs"
                      type="text"
                      value={allInputs.leetCodeId}
                      onChange={handleIt}
                      placeholder="Leetcode"
                      name="leetCodeId"
                      id=""
                    />
                  </div>

                  <div>
                    <input
                      class="register_inputs"
                      type="text"
                      value={allInputs.hackerRankId}
                      onChange={handleIt}
                      placeholder="HackerRank"
                      name="hackerRankId"
                      id=""
                    />
                  </div>
                  <div>
                    <input
                      class="register_inputs"
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

              <button class="register_submit" disabled={!isDisabled}>
                Sign up
              </button>
              <div style={{ fontSize: "12px", color: "red" }}>
                {!isDisabled &&
                  "Please Enter The Required Details Before Submitting"}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default register;
