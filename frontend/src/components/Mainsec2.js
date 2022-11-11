import React from "react";
import {useEffect , useState} from "react";
import axios from 'axios'
import profilelogo from "../utils/Images/profile_login.png";
import "../css/mainsec2.css";

export default function Mainsec2(){
  const [leetId,setleetId] = useState(localStorage.getItem("leetcodeId"));
  const [hackId , setHackId] = useState(localStorage.getItem("hackerrankId"));
  const [change , setChange] = useState("");
  const [change2 , setChange2] = useState("");
  const[error , setError] = useState(false);
  const[error2 , setError2] = useState(false);
  const [dis , setdis] = useState();
  const [dis2 , setdis2] = useState();
  const handleChange = (e) => {
    setChange(e.target.value);
    setError(false);
  }
  const handleChange2 = (e) => {
    setChange2(e.target.value);
    setError2(false);
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    setleetId(change);
  }
  const handleSubmit2 = (e)=>{
    e.preventDefault();
    setHackId(change2);
  }
  useEffect(() => {
    const func  = async() => {
      if(leetId !== 'null'){
      try{
       await axios.get(`http://localhost:5000/api/user/userData/leetcode/${leetId}`).then((data) => {
        if(data.data.allLeet){
  
        localStorage.setItem("leetcodeId" , leetId)
        localStorage.setItem("leetData" ,JSON.stringify(data.data.allLeet))
        setdis(true); 
      }
      });
    }
      catch(err){
        localStorage.removeItem("leetData");
        localStorage.setItem("leetcodeId" ,'null');
        setError(true);
        setleetId('')
        setChange("");
        return console.log(err)
      }
    }
    else {
      localStorage.setItem("leetcodeId" ,'null');
    }
  }
  
    func();
  }, [leetId]);

  useEffect(() => {
    const func  = async() => {
      if(hackId !== 'null'){
      try{
       await axios.get(`http://localhost:5000/api/user/userData/hackerrank/${hackId}`).then((data) => {
        if(data.data.allQues){
        localStorage.setItem("hackerrankId" , hackId)
        // localStorage.setItem("hackData" ,JSON.stringify(data.data.allQues))
        console.log(data.data.allQues)
        setdis2(true); 
      }
      });
    }
      catch(err){
        localStorage.removeItem("hackData");
        localStorage.setItem("hackId" ,'null');
        setError2(true);
        setHackId('')
        setChange2("");
        return console.log(err)
      }
    }
    else {
      localStorage.setItem("hackerrankId" ,'null');
    }
  }
  
    func();
  }, [hackId]);

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
            
            {dis ? <div className="status_box">
              <p>Leet Code</p>
              <div className="status_nums">
                <div className="status_circle">{JSON.parse(localStorage.getItem("leetData"))[1].count}</div>
                <div className="status_circle">{JSON.parse(localStorage.getItem("leetData"))[2].count}</div>
                <div className="status_circle">{JSON.parse(localStorage.getItem("leetData"))[3].count}</div>
              </div>
              <div className="status_diff">
                <label htmlFor="">Easy</label>
                <label htmlFor="">Medium</label>
                <label htmlFor="">Hard</label>
              </div>
            </div>:
            <div className="status_div">
              <p>Enter Leet Code ID</p>
                <form onSubmit={handleSubmit}>
                  <input type ="text" onChange={handleChange} value ={change} placeholder="Enter Leetcode Id"/>
                  <button type="submit">Submit</button>
                  <div style={{fontSize: '10px' , color:"red"}}>{error && "Please Enter A Valid Leetcode Id"}</div>
                </form>
                
              </div>
            }
           {dis2 ? <div className="status_box">
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
            </div>:
            <div className="status_div">
              <p>Enter Hackerrank ID</p>
                <form onSubmit={handleSubmit2}>
                  <input type ="text" onChange={handleChange2} value ={change2} placeholder="Enter Hackerrank Id"/>
                  <button type="submit">Submit</button>
                  <div style={{fontSize: '10px' , color:"red"}}>{error2 && "Please Enter A Valid Hackerrank Id"}</div>
                </form>
                
              </div>}
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
