import * as React from 'react';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom'
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import {Typography, Button} from "@mui/material"
import axios from 'axios';
import Prompt from 'react'
  export default function BasicCard({id,title,description,ourUser,edit}) {
    const navigate = useNavigate();
    const sendRequest = async() => {
      const res = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch((err)=>{console.log(err)})
      const message = await res.message;
      return message;
    }
    return (
      <Card onClick = {()=> navigate("/myBlogs/:id",
      {state:{
        description:{description},
        ourUser:{ourUser},
        title:{title},
        id:{id}}
    }
    )
  } 
        sx={{ 
        minWidth: 275 ,
        margin:5,
        boxShadow : "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
        }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
           From - {ourUser}
          </Typography>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        
        {edit&& <><CardActionArea sx ={{display : "inline" , maxWidth : 100}}>
            <Button  onClick= {(e) =>{
              e.stopPropagation()
              navigate("/blogs/add" , {state:{description:{description} , title:{title} ,id:{id}}});
              }}>
                Edit Post
            </Button>
        </CardActionArea>
        <CardActionArea sx ={{display : "inline" ,maxWidth : 100}}>
            <Button  onClick= {(e) =>{
              e.stopPropagation();
              const answer = window.confirm("You Sure You Want To Delete The Post");
              if(answer){
                sendRequest().then((message) => <Prompt message={message}/>);
              }
              }}>
                Delete
            </Button>
        </CardActionArea></>
        }
        </CardContent>
      </Card>
    );
  }