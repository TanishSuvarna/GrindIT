import Header from "./Header";
import Auth from "./Auth";
import Blogs from "./Blogs";
import BlogsDetail from "./BlogSDetail";
import AddBlog from "./AddBlog";
import UserBlog from "./UserBlog";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import PrivateRoutes from "../utils/privateRoutes";
import Reminder from "./Reminder";
import UserReminders from "./UserReminders";
import ReminderDetails from "./ReminderDetails";
import ProfilePage from "./ProfilePage";
import Navbar from "./Navbar";
import AddRemider from "./AddReminders";
import { authActions } from "../store";
import LandingPage from "./LandingPage";
import { useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const [isSignUp, setisSignUp] = React.useState(false);
  const [isAddBlog, setisAddBlog] = React.useState(false);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const location = useLocation();

  return (
    <AnimatePresence>
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
              element={
                <LandingPage setisSignUp={setisSignUp} isSignUp={isSignUp} />
              }
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
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
