import React ,{useState  ,useRef , useCallback} from 'react'
import BasicCard from './blogcomponent';
import Paginated from './paginatedData';
const Blogs = ({setisAddBlog}) => {
  setisAddBlog(false);
  
  const [offset,setOffset] = useState(0);

  //Custom Hook
 const{loading , empty , getBlogs} = Paginated('http://localhost:5000/api/blog/',"allBlogs",offset);
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
        return <BasicCard key = {index} ref= {lastElementRef} id = {blog._id} title = {blog.title} description={blog.description} ourUser={blog.ourUser.name}/>
      }
      else{
      return <BasicCard key = {index} id = {blog._id} title = {blog.title} description={blog.description} ourUser={blog.ourUser.name}/>
    }
})}
     <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{loading && `Loading...`}</div>
    </div>
  )
}

export default Blogs
