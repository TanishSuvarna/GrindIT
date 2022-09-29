import React from 'react'
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link}from 'react-router-dom'
import {authActions} from '../store' 
import {AppBar , Typography,Toolbar, Box, Button ,Tabs ,Tab} from "@mui/material"
const Header = ({setisSignedUp,isAddBlog}) => {
  const [value,setValue] =useState();
  const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) =>  state.isLoggedIn);
  return (
    <AppBar position ="sticky">
        <Toolbar>
        <Typography variant = "h4" > Discussion </Typography>
       {isLoggedIn && 
       <Box marginLeft = "auto" marginRight = "auto">
            <Tabs textColor = "inherit" value ={value} onChange={(e,val) => setValue(val)}>
                <Tab LinkComponent={Link} to="/blogs" label ="All Posts"/>
                <Tab LinkComponent={Link} to="/myBlogs" label ="My Posts"/>
            </Tabs>
        </Box>
        }
        <Box marginLeft = "auto">
                {!isLoggedIn && 
                <><Button onClick ={() => setisSignedUp(false)} LinkComponent={Link} to="/auth" variant = "contained" sx ={{margin:1 , borderRadius:10}} color ="warning">Login</Button>
                <Button onClick ={() => setisSignedUp(true)} LinkComponent={Link} to="/auth"variant = "contained" sx ={{margin:1 , borderRadius :10}} color = "warning">Register</Button></>
                }
                {isLoggedIn &&
                  <>{!isAddBlog && <Button LinkComponent={Link} to="/blogs/add" state ={{add:"true"}} variant = "contained"  sx ={{margin:1 , borderRadius :10}} color = "warning">Add A Post</Button>}
                  <Button onClick= {() => dispatch(authActions.register())} LinkComponent={Link} to="/auth"variant = "contained" sx ={{margin:1 , borderRadius :10}} color = "warning">Logout</Button>
                  </>
                  }
        </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header