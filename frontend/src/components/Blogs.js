import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import BasicCard from './blogcomponent';
const Blogs = ({setisAddBlog}) => {
  setisAddBlog(false);
  const [getBlogs, setgetBlogs] = useState();
  const sendRequest =async () => {
    let response;
  try{
    response = await axios.get("http://localhost:5000/api/blog");
  }
  catch(err){
    return console.log(err);
  }
  const data =await response.data;
 return data;
}
useEffect(() => {
  sendRequest().then((data) => {
  setgetBlogs(data.allBlogs);
})
},[]);
  return (
    <div>
    {getBlogs && 
    getBlogs.map((blog)=>(
      <BasicCard id = {blog._id} title = {blog.title} description={blog.description} ourUser={blog.ourUser.name}/>
    ))}
    </div>
  )
}

export default Blogs
