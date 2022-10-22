import React from 'react'
import { useEffect , useState } from 'react';
import BasicCard from './blogcomponent';
import axios from 'axios';
const UserBlog = ({setisAddBlog}) => {
  setisAddBlog(false);
  const [getUserBlog, setgetUserBlog] = useState()
  const userId = localStorage.getItem("userId");
  const sendRequest = async () => {
  const response = await axios.get(`http://localhost:5000/api/blog/allBlogs/${userId}`).catch((err) => console.log(err));
  const data =await response.data;
  return data;
}; 
  useEffect(() => {
    sendRequest().then((data) => {
      setgetUserBlog(data.message);
    }, [])})

  return (
    <div>
    {getUserBlog && 
    getUserBlog.map((blog)=>(
      <BasicCard id = {blog._id} title = {blog.title} description={blog.description} ourUser={localStorage.getItem("Name")} edit="true"/>
    ))}
    </div>
  )
}

export default UserBlog;