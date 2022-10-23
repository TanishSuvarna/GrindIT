import React from 'react'
import { TextField,Button,CardContent,Typography,Card,CardActionArea } from '@mui/material';
import { useLocation ,useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box'
import axios from 'axios';
import AddComment from './addComment';
const BlogSDetail = ({setisAddBlog}) => {
  setisAddBlog(true);
  const [getUserBlog, setgetUserBlog] = React.useState();
  const [getBlogComments,setgetBlogComments] = React.useState([]);
  const [commentData,setCommentData] = React.useState("");
  const [isDisabled,setisDisabled] = React.useState(true);
  const [editComment , seteditComment] = React.useState();
  const navigate = useNavigate();
  const Location = useLocation();
  const sendRequest = async () => {
    const response = await axios.get(`http://localhost:5000/api/blog/${Location.state.id.id}`).catch((err) => console.log(err));
    const data =await response.data;
    return data;
  };
  React.useEffect(()=>{
    sendRequest().then((data) =>{
      setgetUserBlog(data.showBlog)
      setgetBlogComments(data.showBlog.userComments)
    });
  },[])
  const handleIt =async (e) => {
    setCommentData(await e.target.value);
    const comment =  commentData;
    if(comment.length > 1){
      setisDisabled(false);
    }
    else{
      setisDisabled(true);
    }
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const input = {description: commentData , ourUser : localStorage.userId , ourBlog:Location.state.id.id}
    const res= await axios.post(`http://localhost:5000/api/blog/comments`,input).catch((err) => console.log(err));
    const newComment = await res.data.allData;
    setgetBlogComments([...getBlogComments, newComment]);
  }
  const handleSubmitUpdate = async (e) =>{
    e.preventDefault();
    const res= await axios.put(`http://localhost:5000/api/blog/comments/${editComment}`,{commentData}).catch((err) => console.log(err));
    sendRequest().then(async (data) =>{
      const res = await data.showBlog.userComments;
      console.log(res);
       setgetBlogComments(res);
    });
    seteditComment("");
    setCommentData("")
  }
  const sendDelRequest =  async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/blog/comments/${id}`);
    setgetBlogComments((getBlogComments) => getBlogComments.filter((comment) => comment._id !== id))
    return res.data;
  }
  return (
    <>
    {getUserBlog &&
    <>
    <List sx={{
        marginLeft : 3,
        marginRight:3,
        width: '100%',
        bgcolor: 'background.paper',
      }}>
    <ListItem>
    <Box  sx ={{margin : 5 , marginBottom : 0}}>
    <ListItemText primary={getUserBlog.title} />
    <ListItemText primary={Location.state.ourUser.ourUser}/>
  </Box>
  
  </ListItem>
  <Divider testAlign ="center">Description</Divider>
  <ListItem>
  <Box  margin= {5} >
  <ListItemText  fullWidth sx={{whiteSpace: "pre-wrap"}} primary={getUserBlog.description}/>
</Box>
</ListItem>
</List>
<AddComment 
isDisabled ={isDisabled} 
commentData = {commentData}
handleIt ={handleIt} 
handleSubmit ={handleSubmit}/>
</>
}
    {
      getBlogComments && <>
         {
          getBlogComments.map((comment) => (
         
          <Card  sx={{ 
        minWidth: 275 ,
        margin:5,
        boxShadow : "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
        }}>
        <CardContent>
          {editComment !== comment._id ? <>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            From - {comment.ourUser.name}
          </Typography>
          <Typography variant="h6" component="div">
            {comment.description}
          </Typography>
          </>:
          <AddComment isDisabled ={isDisabled} 
                     commentData = {commentData}
                     handleIt ={handleIt} 
                    handleSubmit ={handleSubmitUpdate}
                    />}
          </CardContent>
          {(editComment !== comment._id)&& (localStorage.userId === comment.ourUser._id) && <><CardActionArea sx ={{display : "inline" , maxWidth : 75 , marginBottom : 2}}>
            <Button  onClick= {(e) =>{
              e.stopPropagation();
              seteditComment(comment._id);
              setCommentData(comment.description);
              }}>
                Edit
            </Button>
        </CardActionArea>
        <CardActionArea sx ={{display : "inline" , maxWidth : 75 , marginBottom : 2}}>
            <Button  onClick= {(e) =>{
              e.stopPropagation();
              const answer = window.confirm("You Sure You Want To Delete The Post");
              
              if(answer){
                sendDelRequest(comment._id);
              }
              }}>
                Delete
            </Button>
        </CardActionArea></>
        }
        
          </Card>    
           
          ))
         }
      </>
    }
  </>

)
}


export default BlogSDetail
