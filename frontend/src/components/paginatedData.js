
import { useEffect,useState } from 'react';
import axios from 'axios';
const PaginatedData = (query,variable,offset) => {
  
    const [getBlogs, setgetBlogs] = useState();
    const [empty , setEmpty] = useState();
    const [loading,setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`${query}${offset}`)
   .catch(err => console.log(err))
   .then(data=> {
    if((Array.isArray(data.data[variable]) && !data.data[variable].length)|| (!Array.isArray(data.data[variable]) && !data.data[variable].userComments.length)){
      setEmpty(true);
      setLoading(false);
    }
    
    setgetBlogs((prevBlogs) => {
    if(Array.isArray(data.data[variable])){
      if(!prevBlogs || !offset) return [...data.data[variable]]
      return [...prevBlogs , ...(data.data[variable])];
  }
    else{
      if(!prevBlogs || !offset) return {...data.data[variable]};
      return {...prevBlogs , userComments : [...prevBlogs.userComments,...data.data[variable].userComments]};
    }
    });
    
    setLoading(false);
  })   
  }
  ,[offset]);
  return {getBlogs , loading ,empty ,setgetBlogs};
}

export default PaginatedData