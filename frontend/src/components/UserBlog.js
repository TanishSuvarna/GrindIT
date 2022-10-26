import React from 'react'
import { useState,useCallback,useRef } from 'react';
import BasicCard from './blogcomponent';
import Paginated from './paginatedData';
const UserBlog = ({setisAddBlog}) => {
const userId = localStorage.getItem("userId");
const [offset,setOffset] = useState(0);
const{loading , empty , getBlogs ,setgetBlogs} = Paginated(`http://localhost:5000/api/blog/allBlogs/${userId}/`,"userBlogs",offset)

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
  return (
    <div>
    {getBlogs && 
    getBlogs.map((blog , index)=>{
      if(index + 1 === getBlogs.length){
        return <BasicCard setgetBlogs = {setgetBlogs} ref ={lastElementRef} key ={index} id = {blog._id} title = {blog.title} description={blog.description} ourUser={localStorage.getItem("Name")} edit="true"/>
      }
      else{
        return <BasicCard setgetBlogs = {setgetBlogs} key ={index} id = {blog._id} title = {blog.title} description={blog.description} ourUser={localStorage.getItem("Name")} edit="true"/>
      }
    })}
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{loading && `Loading...`}</div>
    </div>
  )
}

export default UserBlog;