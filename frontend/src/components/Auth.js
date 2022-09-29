import React from 'react'
import { Typography, Box, Button ,TextField} from "@mui/material"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
import { useNavigate } from 'react-router-dom'
const Auth = ({isSignedUp,setisSignedUp}) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [allInputs, setallInputs] = React.useState({
    name:"",
    email:"",
    password:""
  });
  const handleIt =(e)=>{
    setallInputs((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    })
    )
  }
  const sendRequest =async(type)=>{
    const user = {name : allInputs.name , email:allInputs.email ,password:allInputs.password}
    let res;
    try{
     res = await axios.post(`http://localhost:5000/api/user/${type}` ,user)
     console.log(res);
  }
    catch(err){
      setallInputs({
        name:"",
        email:"",
        password:""
      })
      return console.log(err);
    }
   const data = await res.data;
   console.log(data);
   localStorage.setItem("userId" , data.newUser._id);
   localStorage.setItem("Name" , data.newUser.name);
   dispatch(authActions.login());
   navigate("/blogs");
   return data;
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(isSignedUp) sendRequest("signup");
    else sendRequest("login");
  }
  return (
    <div>
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
      </form>
    </div>
  )
}

export default Auth;


