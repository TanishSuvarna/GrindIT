import React from "react";
import Login from "./login";
import Register from "./register";
import axios from "axios";
import { useState , useEffect } from 'react'
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
const Auth = ({ isSignUp, setisSignUp }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [validLength, setValidLength] = useState(null);
const [hasNumber, setHasNumber] = useState(null);
const [upperCase, setUpperCase] = useState(null);
const [lowerCase, setLowerCase] = useState(null);
const [specialChar, setSpecialChar] = useState(null);
const [eVal , seteVal] = useState(null);
const [match, setMatch] = useState(null);
const [isDisabled,setisDisabled] = useState(false);

  const [allInputs, setallInputs] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPass:"",
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
    setMatch(allInputs.password && allInputs.password === allInputs.confirmPass);
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(allInputs.password));
    seteVal(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(allInputs.email))
    setisDisabled(validLength && hasNumber && upperCase && lowerCase && specialChar && eVal && match && (allInputs.name.length > 0) && (allInputs.phoneNumber.length === 10))
    }, [allInputs.password, allInputs.confirmPass ,allInputs.email,allInputs.name,allInputs.phoneNumber]);
    useEffect (() =>{
      setisDisabled(validLength && hasNumber && upperCase && lowerCase && specialChar && eVal && match && (allInputs.name.length > 0) && (allInputs.phoneNumber.length === 10))
    },[validLength , upperCase,lowerCase,specialChar,eval,match,hasNumber])
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
     console.log(res.data);
  }
    catch(err){
      setallInputs({
        name: "",
        email: "",
        password: "",
    confirmPass:"",
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
    localStorage.setItem("Name", data.newUser.name);
   if(data.newUser.leetcodeId) localStorage.setItem("leetCodeId" , data.newUser.leetcodeId);
   else localStorage.setItem("leetCodeId" , 'null');
    dispatch(authActions.login());
    navigate("/blogs");
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    isSignUp ? sendRequest("signup") : sendRequest("login");
  };
  return (
    <div>
      {isSignUp ?
      <Register eVal = {eVal} match = {match} isDisabled = {isDisabled} specialChar = {specialChar} hasNumber = {hasNumber} upperCase = {upperCase} lowerCase = {lowerCase}validLength = {validLength} setisSignUp = {setisSignUp} handleSubmit = {handleSubmit} setallInputs = {setallInputs} allInputs ={allInputs} handleIt ={handleIt}/>
      :<Login  setisSignUp = {setisSignUp} handleSubmit = {handleSubmit} setallInputs = {setallInputs}  allInputs ={allInputs} handleIt ={handleIt}/>}
    </div>
  );
};

export default Auth;
