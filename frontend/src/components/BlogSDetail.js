import React from 'react'
import { Button,CardContent,Typography,Card,CardActionArea } from '@mui/material';
import { useLocation} from 'react-router-dom';
import {useRef,useCallback} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box'
import axios from 'axios';
import AddComment from './addComment';
import Paginated from './paginatedData';
const BlogSDetail = ({setisAddBlog}) => {
  const [commentData,setCommentData] = React.useState("");
  const [isDisabled,setisDisabled] = React.useState(true);
  const [editComment , seteditComment] = React.useState();
  const Location = useLocation();
  const [offset,setOffset] = React.useState(0);
  const{loading , empty , getBlogs,setgetBlogs} = Paginated(`http://localhost:5000/api/blog/allBlogs/oneBlog/${Location.state.id.id}/`,"showBlog",offset);
  const observer = useRef();
  const lastElementRef = useCallback(
    node => {
      if(loading || empty) return;
       if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if(entries[0].isIntersecting && !empty){
            setOffset(prevOffset => prevOffset + 5)
          }
        })
      if(node)observer.current.observe(node);
    },
    [loading , empty],
  )
  const handleIt =async (e) => {
    setCommentData(e.target.value);
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
  const res = await axios.post(`http://localhost:5000/api/blog/comments`,input).catch((err) => console.log(err));
  if(empty){
    setgetBlogs(prevBlog => {
      return {...prevBlog , userComments:[...prevBlog.userComments , res.data.allData]};
    })
  }
  }
  const handleSubmitUpdate = async (e) =>{
    e.preventDefault();
    const res = await axios.put(`http://localhost:5000/api/blog/comments/${editComment}`,{commentData}).catch((err) => console.log(err));
    setgetBlogs((prevBlogs) =>{
      return {...prevBlogs , userComments:[...prevBlogs.userComments.map((blog) =>{ 
        if(blog._id === res.data.newComment._id){
           blog.description = commentData;
        }
        return blog;
      })]}
     });
    seteditComment("");
    setCommentData("");
  }
  const sendDelRequest =  async (id) => {
    await axios.delete(`http://localhost:5000/api/blog/comments/${id}`);
    setgetBlogs((prevBlogs) =>{
       return {...prevBlogs , userComments:[...prevBlogs.userComments.filter((blog) => blog._id !== id)]}
      });
  }
  return (
    <>
    {getBlogs &&
    <>
    <List sx={{
        marginLeft : 3,
        marginRight:3,
        width: '100%',
        bgcolor: 'background.paper',
      }}>
    <ListItem>
    <Box  sx ={{margin : 5 , marginBottom : 0}}>
    <ListItemText primary={getBlogs.title} />
    <ListItemText primary={Location.state.ourUser.ourUser}/>
  </Box>
  
  </ListItem>
  <Divider testAlign ="center">Description</Divider>
  <ListItem>
  <Box  margin= {5} >
  <ListItemText  fullWidth sx={{whiteSpace: "pre-wrap"}} primary={getBlogs.description}/>
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
      getBlogs && getBlogs.userComments && <>
         {

          getBlogs.userComments.map((comment,index) => {

         return <><Card key={index} ref = {index + 1 === getBlogs.userComments.length ? lastElementRef : undefined}sx={{ 
        minWidth: 275 ,
        margin:2,
        boxShadow : "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
        }}>
        <CardContent>
          {editComment !== comment._id ? <>
          <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
            From - {comment.ourUser.name}
          </Typography>
          <Typography variant="h12" component="div">
            {comment.description}
          </Typography>
          </>:
          <AddComment isDisabled ={isDisabled} 
                     commentData = {commentData}
                     handleIt ={handleIt} 
                    handleSubmit ={handleSubmitUpdate}
                    />}
          </CardContent>
          {(editComment !== comment._id)&& (localStorage.userId === comment.ourUser._id) && <><CardActionArea sx ={{display : "inline" , maxWidth : 75}}>
            <Button  onClick= {(e) =>{
              e.stopPropagation();
              seteditComment(comment._id);
              setCommentData(comment.description);
              }}>
                Edit
            </Button>
        </CardActionArea>
        <CardActionArea sx ={{display : "inline" , maxWidth : 75}}>
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
          {index + 1 === getBlogs.userComments.length && <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{loading && `Loading...`}</div>}  
        </>}    
           
          )
         }
      </>
    }
  </>

)
}


export default BlogSDetail
