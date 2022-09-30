import React from 'react'
import '../css/loginpage.css'
import profile_login from '../utils/Images/profile_login.jpg'
import lock_login from '../utils/Images/lock_login.jpg'
import Logo from '../utils/Images/Logo.png'
import facebook from "../utils/socialLogo/facebook.png"
import instagram from "../utils/socialLogo/instagram.png"
import twitter from "../utils/socialLogo/twitter.png" 
import youtube from "../utils/socialLogo/youtube.png"
const login = ({setisSignUp , handleSubmit,handleIt,setAllInputs ,allInputs}) => {
  return (
    <div>
        <div class="ripple-background"><div class="circle xxlarge shade1"></div>
        <div class="circle xlarge shade2"></div>
        <div class="circle large shade3"></div>
        <div class="circle mediun shade4"></div>
        <div class="circle small shade5"></div></div>
        <div class="main_container">
            <div class="login_pic_div">
            </div>
            <div class="Login_div">
                    <form action="" class="Login_form" onSubmit={handleSubmit}>
                        <div class="login_box_container">
                            <div class="Login_box">
                                <img class="img" src={profile_login} alt=""/>
                                <input class="inputs" type="email" value={allInputs.email} onChange = {handleIt}placeholder="Email" name="email" id=""/>
                            </div>
                        </div>     
                        <div class="login_box_container">
                            <div class="Login_box">

                                <img class="img" src={lock_login} alt=""/>
                                <input class="inputs" type="password" value={allInputs.password} onChange ={handleIt} placeholder="Password" name="password" id=""/>
        
                            </div>
                        </div>
                        <button id="submit_btn">Login</button>
                        <p style = {{color: "white"}} >Doesn't have an account? <span style ={{color:"blue" , cursor:"pointer"} } onClick ={() => setisSignUp(true)}>Register Here</span></p>
                    </form>
            </div>      
        </div>

        <div class="footer">
            <div class="footer_wrapper">
                <img class="footer_logo" src={Logo} alt=""/>
                <p>We provide a platform which will help you on your journey to crack your dream company. Practise daily with daily reminders of DSA Questions from famous websites like Leetcode , HackerRank , Code Ninja .</p>
            </div>
            <div class="socials"> 
                <a href="facebook.com"><img src={facebook} alt=""/></a>
                <a href="instagram.com"><img src={instagram} alt=""/></a> 
    
                <a href="twitter.com"><img src={twitter}alt=""/></a> 
    
                <a href="youtube.com"> <img src={youtube}alt=""/></a>
            </div>  
        </div>
        <div class="copyright">
            <p>Copyright © 2022 SudoKode</p>
        </div>
    </div>
  )
}

export default login