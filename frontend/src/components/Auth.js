import React from "react";
import Login from "./login";
import Register from "./register";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
const Auth = ({ isSignUp, setisSignUp }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [allInputs, setallInputs] = React.useState({
    name: "",
    email: "",
    password: "",
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
    try {
      res = await axios.post(`http://localhost:5000/api/user/${type}`, user);
    } catch (err) {
      setallInputs({
        name: "",
        email: "",
        password: "",
        leetCodeId: "",
        hackerRankId: "",
        codeNinjaId: "",
        phoneNumber: "",
      });
      return console.log(err);
    }
    const data = await res.data;
    localStorage.setItem("userId", data.newUser._id);
    localStorage.setItem("Name", data.newUser.name);
    dispatch(authActions.login());
    navigate("/myProfile");
    console.log(data);
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    isSignUp ? sendRequest("signup") : sendRequest("login");
  };
  return (
    <div>
      {isSignUp ? (
        <Register
          setisSignUp={setisSignUp}
          handleSubmit={handleSubmit}
          setallInputs={setallInputs}
          allInputs={allInputs}
          handleIt={handleIt}
        />
      ) : (
        <Login
          setisSignUp={setisSignUp}
          handleSubmit={handleSubmit}
          setallInputs={setallInputs}
          allInputs={allInputs}
          handleIt={handleIt}
        />
      )}
      {/*      
<form onSubmit ={handleSubmit}>
    <Box 
    maxWidth ={400}
    display = "flex"
    boxShadow = "10px 10px 20px #ccc"
     flexDirection = "column" 
     alignItems = "center"
    justifyContent ="center"
    margin = "auto"
    padding = {5}
    marginTop ={5}
    borderRadius ={5}
   >
      {isSignedUp?
      <><Typography variant ="h4">Register</Typography>
      <TextField  label ="Name" name ="name"onChange ={handleIt}value ={allInputs.name } placeholder='Name' margin ="normal"/></>:
      <Typography variant ="h4">Login</Typography>
      }
      <TextField  type={'email'} label ="Email" name ="email" onChange ={handleIt} value ={allInputs.email}  placeholder='Email'margin ="normal"/>
      <TextField  type ={'password'} label ="Password" name ="password" onChange ={handleIt} value ={allInputs.password} placeholder='Password' margin ="normal"/>
      {!isSignedUp?
      <><Button type="submit" sx = {{borderRadius : 5}} variant="contained">Log In</Button>
      <Button onClick ={() => setisSignedUp(true)}>Get Yourself Registered</Button></>:
      <><Button type="submit" sx = {{borderRadius : 5}} variant="contained">Register</Button>
      <Button onClick ={() => setisSignedUp(false)}>Login User</Button></>
    }
    </Box>
  </form> */}
    </div>
  );
};

export default Auth;
