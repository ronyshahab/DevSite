"use client";
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Suspense, lazy } from "react";
import Landing from "./component/layout/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Loader from "./component/smallerComponent/Loader";
import Navbar from "./component/smallerComponent/navbar/Navbar";
import { ToastContainer } from "./component/smallerComponent/Toast";
import "react-toastify/dist/ReactToastify.css";
import AuthGuard from "./component/smallerComponent/AuthGuard";
import LoggedInUser from "./component/smallerComponent/LoggedInUser";
const Profiles = lazy(() => import("./component/layout/profile/Profiles"));
const Profile = lazy(() => import("./component/layout/profile/Profile"));
const CreateProfile = lazy(() =>
  import("./component/forms/creatProfile/CreateProfile")
);
const AddExperience = lazy(() => import("./component/forms/AddExperience"));
const AddEducation = lazy(() => import("./component/forms/AddEducation"));
const Posts = lazy(() => import("./component/layout/Posts"));
const Post = lazy(() => import("./component/layout/Post"));
const Dashboard = lazy(() => import("./component/layout/dashboard/Dashboard"));
const Register = lazy(() => import("./component/auth/Register"));
const Login = lazy(() => import("./component/auth/Login"));

const App = () => {
  const linkName = ["Developer", "Post"];
  const linkPath = ["/profiles", "/post"];
  return (
    <Provider store={store}>
      <Router>
        <Navbar name={linkName} link={linkPath} />
        <ToastContainer />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route
              path="profiles"
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
              path="post"
              element={
                <AuthGuard>
                  <LoggedInUser>
                    <Post />
                  </LoggedInUser>
                </AuthGuard>
              }
            ></Route>
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
