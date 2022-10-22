
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import BlogsDetail from "./components/BlogSDetail";
import AddBlog from "./components/AddBlog";
import UserBlog from "./components/UserBlog";
import React from "react"
import { useSelector } from "react-redux";
import { Route , Routes } from "react-router";
import PrivateRoutes from "./utils/privateRoutes";
const App =  () => {
  const [isSignUp, setisSignUp] = React.useState(false);
  const [isAddBlog, setisAddBlog] = React.useState(false);
  const isLoggedIn = useSelector((state) =>  state.isLoggedIn);
  return <React.Fragment>
    {isLoggedIn && <header>
      <Header setisSignUp={setisSignUp} isSignUp ={isSignUp} isAddBlog = {isAddBlog} setisAddBlog ={setisAddBlog}/>
    </header>}
    <main>
      <Routes>
        <Route element = {<PrivateRoutes/>}>
          <Route path="/blogs" element ={<Blogs setisAddBlog ={setisAddBlog}/>}/>
          <Route path="/myBlogs" element ={<UserBlog setisAddBlog ={setisAddBlog}/>}/>
          <Route path="/myBlogs/:id" element ={<BlogsDetail setisAddBlog ={setisAddBlog}/>}/>
          <Route path="/blogs/add" element ={<AddBlog isAddBlog = {isAddBlog} setisAddBlog ={setisAddBlog}/>}/>
        </Route>
        <Route path="/auth" element ={<Auth setisSignUp={setisSignUp} isSignUp ={isSignUp}/>}/>
        <Route path="/" element ={<Auth setisSignUp={setisSignUp} isSignUp ={isSignUp}/>}/>
      </Routes>
    </main>
    </React.Fragment>
}

export default App;
