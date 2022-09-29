import React from 'react'
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box'
import axios from 'axios';
const BlogSDetail = ({setisAddBlog}) => {
  setisAddBlog(true);
  const [getUserBlog, setgetUserBlog] = React.useState()
  const Location = useLocation();
  const sendRequest = async () => {
    const response = await axios.get(`http://localhost:5000/api/blog/${Location.state.id.id}`).catch((err) => console.log(err));
    const data =await response.data;
    return data;
  };
  React.useEffect(()=>{
    sendRequest().then((data) => setgetUserBlog(data.showBlog));
  },[])
  
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
</>}
  </>

)
}


export default BlogSDetail