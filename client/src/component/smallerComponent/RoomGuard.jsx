import React, { lazy, useEffect, useMemo, useRef } from "react";
import "../../App.css";
import { io } from "socket.io-client";
import { Route, Routes, useParams } from "react-router-dom";
import AuthGuard from "../../component/smallerComponent/AuthGuard";
import LoggedInUser from "../../component/smallerComponent/LoggedInUser";
import SingleChat from "../../component/chat/SingleChat";
import Group from "../../component/layout/group/Group";
import getData from "../../commonFunction/getDataFromAxios";
import { useDispatch, useSelector } from "react-redux";
import { pushNotification } from "../../redux/slices/Notification.slice";
const Profiles = lazy(() => import("../../component/layout/profile/Profiles"));
const Profile = lazy(() => import("../../component/layout/profile/Profile"));
const CreateProfile = lazy(() =>
  import("../../component/forms/creatProfile/CreateProfile")
);
const AddExperience = lazy(() => import("../../component/forms/AddExperience"));
const AddEducation = lazy(() => import("../../component/forms/AddEducation"));
const Posts = lazy(() => import("../../component/layout/posts/Posts"));
const Post = lazy(() => import("../../component/layout/posts/Post"));
const Dashboard = lazy(() =>
  import("../../component/layout/dashboard/Dashboard")
);

const RoomGuard = () => {
  const socket = useMemo(() => io("http://localhost:5000"), []);
  const dispatch = useDispatch();
  const params = useParams()

  let firstRender = useRef(true);
  const currentUser = useSelector((s) => s.currentUser);
  const conversationIds = currentUser?.user?.conversationIds;
  const fetchData = async () => {
    const config = {
      conversationIds,
    };
    const data = await getData(
      "post",
      "http://localhost:5000/api/chat/check/notification",
      config
    );
    //this one is for checking a notification when a user login in the app

    if(data.data) {
      data.data.forEach((element)=>{

        dispatch(pushNotification(element))
      })
    }
  };

  useEffect(() => {
    if (firstRender.current && currentUser._id) {
      socket.on("newMessage", (roomId, userId) => {
        console.log(params["*"], userId)
        if (currentUser?.user?._id !== userId  && params['*'] !== `chat/${userId}`) {
          dispatch(pushNotification(userId));
        }
      });
      conversationIds.forEach((element) => {
        socket.emit("joinRoom", element);
      });
      firstRender.current = false;
      fetchData();
    }
  }, [currentUser]);

  useEffect(() => {
    
    return () => {
      console.log("socket disconnected");
      socket.disconnect();
    };
  }, []);

  return (
    <Routes>
      <Route
        path="/profiles"
        element={
          <AuthGuard>
            <LoggedInUser>
              <Profiles />
            </LoggedInUser>
          </AuthGuard>
        }
      ></Route>
      <Route
        path="dashboard"
        element={
          <AuthGuard>
            <LoggedInUser>
              <Dashboard />
            </LoggedInUser>
          </AuthGuard>
        }
      ></Route>
      <Route
        path="profile"
        element={
          <AuthGuard>
            <LoggedInUser>
              <Profile />
            </LoggedInUser>{" "}
          </AuthGuard>
        }
      ></Route>
      <Route
        path="profile/:id"
        element={
          <AuthGuard>
            <LoggedInUser>
              <Profile />
            </LoggedInUser>{" "}
          </AuthGuard>
        }
      ></Route>
      <Route
        path="chat/:id"
        element={
          <AuthGuard>
            <LoggedInUser>
              <SingleChat socket={socket} />
            </LoggedInUser>{" "}
          </AuthGuard>
        }
      ></Route>
      <Route
        path="create-profile"
        element={
          <AuthGuard>
            {" "}
            <CreateProfile />
          </AuthGuard>
        }
      ></Route>
      <Route
        path="add-experience/:updatable"
        element={
          <AuthGuard>
            {" "}
            <AddExperience />{" "}
          </AuthGuard>
        }
      ></Route>
      <Route
        path="add-education/:updatable"
        element={
          <AuthGuard>
            {" "}
            <AddEducation />{" "}
          </AuthGuard>
        }
      ></Route>
      <Route
        path="posts"
        element={
          <AuthGuard>
            <LoggedInUser>
              <Posts />
            </LoggedInUser>{" "}
          </AuthGuard>
        }
      ></Route>
      <Route
        path="post/:id"
        element={
          <AuthGuard>
            <LoggedInUser>
              <Post />
            </LoggedInUser>
          </AuthGuard>
        }
      ></Route>
      <Route
        path="group"
        element={
          <AuthGuard>
            <LoggedInUser>
              <Group />
            </LoggedInUser>
          </AuthGuard>
        }
      ></Route>
    </Routes>
  );
};

export default RoomGuard;
