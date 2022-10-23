import React from 'react'
import Prompt from 'react'
import { TextField,Button,CardContent,Typography,Card,CardActionArea } from '@mui/material';
import { useLocation ,useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box'
import axios from 'axios';
const BlogSDetail = ({setisAddBlog}) => {
  setisAddBlog(true);
  const [getUserBlog, setgetUserBlog] = React.useState();
  const [getBlogComments,setgetBlogComments] = React.useState([]);
  const [commentData,setCommentData] = React.useState("");
  const [isDisabled,setisDisabled] = React.useState(true);
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
    const newComment = await res.data.newComment;
    console.log(newComment);
    setgetBlogComments([...getBlogComments, newComment]);
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
<form onSubmit={handleSubmit}>
<Box display = "flex"
        boxShadow = "10px 10px 20px #ccc"
         flexDirection = "column" 
         alignItems = "center"
         background ="white"
        justifyContent ="center"
        margin= {5}
        padding = {5}
        marginTop ={3}
        borderRadius ={5}>
          <TextField fullWidth minRows ={5} maxRows ={Infinity}  name ="commentData" onChange ={handleIt} value ={commentData}  label="Add A Comment" multiline variant="outlined" placeholder='Add A Comment'  />
          {<Button type="submit" disabled ={isDisabled} sx = {{borderRadius : 5}} variant="contained">Post!</Button>}
</Box>
</form>
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
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
           From - {comment.ourUser.name}
          </Typography>
          <Typography variant="h6" component="div">
            {comment.description}
          </Typography>
          </CardContent>
          {(localStorage.userId === comment.ourUser._id) && <><CardActionArea sx ={{display : "inline" , maxWidth : 75 , marginBottom : 2}}>
            <Button  onClick= {(e) =>{
              e.stopPropagation()
              navigate("/blogs/add" , {state:{description:{} , title:{} ,id:{}}});
              }}>
                Edit
            </Button>
        </CardActionArea>
        <CardActionArea sx ={{display : "inline" , maxWidth : 75 , marginBottom : 2}}>
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
          </Card>
          ))
         }
      </>
    }
  </>

)
}


export default BlogSDetail
