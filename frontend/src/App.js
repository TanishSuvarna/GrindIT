
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import BlogsDetail from "./components/BlogSDetail";
import AddBlog from "./components/AddBlog";
import UserBlog from "./components/UserBlog";
import React from "react"
import { Route , Routes } from "react-router";
import PrivateRoutes from "./utils/privateRoutes";
const App =  () => {
  const [isSignedUp, setisSignedUp] = React.useState(false);
  const [isAddBlog, setisAddBlog] = React.useState(false);
  return <React.Fragment>
    <header>
      <Header setisSignedUp={setisSignedUp} isSignedUp ={isSignedUp} isAddBlog = {isAddBlog} setisAddBlog ={setisAddBlog}/>
    </header>
    <main>
      <Routes>
        <Route element = {<PrivateRoutes/>}>
          <Route path="/blogs" element ={<Blogs setisAddBlog ={setisAddBlog}/>}/>
          <Route path="/myBlogs" element ={<UserBlog setisAddBlog ={setisAddBlog}/>}/>
          <Route path="/myBlogs/:id" element ={<BlogsDetail setisAddBlog ={setisAddBlog}/>}/>
          <Route path="/blogs/add" element ={<AddBlog isAddBlog = {isAddBlog} setisAddBlog ={setisAddBlog}/>}/>
        </Route>
        <Route path="/auth" element ={<Auth setisSignedUp={setisSignedUp} isSignedUp ={isSignedUp}/>}/>
      </Routes>
    </main>
    </React.Fragment>
}

export default App;
