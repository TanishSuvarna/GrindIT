import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import BlogsDetail from "./components/BlogSDetail";
import AddBlog from "./components/AddBlog";
import UserBlog from "./components/UserBlog";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import PrivateRoutes from "./utils/privateRoutes";
import Reminder from "./components/Reminder";
import UserReminders from "./components/UserReminders";
import ReminderDetails from "./components/ReminderDetails";
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
import AddRemider from "./components/AddReminders";
import { authActions } from "./store";
import LandingPage from "./components/LandingPage";
const App = () => {
  const dispatch = useDispatch();
  const [isSignUp, setisSignUp] = React.useState(false);
  const [isAddBlog, setisAddBlog] = React.useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <React.Fragment>
      {isLoggedIn && (
        <>
          <header>
            <Navbar
              setisSignUp={setisSignUp}
              isSignUp={isSignUp}
              isAddBlog={isAddBlog}
              setisAddBlog={setisAddBlog}
            />
          </header>
        </>
      )}
      <main>
        <Routes>
          <Route element={<PrivateRoutes />} />

          {!isLoggedIn ? (
            <>
              <Route
                path="/auth"
                element={<Auth setisSignUp={setisSignUp} isSignUp={isSignUp} />}
              />
              <Route
                path="/"
                element={<LandingPage setisSignUp={setisSignUp} />}
              />
            </>
          ) : (
            <>
              <Route path="/myProfile" element={<ProfilePage />} />
              <Route path="/reminders" element={<Reminder />} />
              <Route path="/addReminder" element={<AddRemider />} />
              <Route
                path="/blogs"
                element={<Blogs setisAddBlog={setisAddBlog} />}
              />
              <Route
                path="/myBlogs"
                element={<UserBlog setisAddBlog={setisAddBlog} />}
              />
              <Route
                path="/myBlogs/:id"
                element={<BlogsDetail setisAddBlog={setisAddBlog} />}
              />
              <Route
                path="/blogs/add"
                element={
                  <AddBlog isAddBlog={isAddBlog} setisAddBlog={setisAddBlog} />
                }
              />
              <Route path="/myReminders" element={<UserReminders />} />

              <Route
                path="reminders/myReminders/:id"
                element={<ReminderDetails />}
              />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;
