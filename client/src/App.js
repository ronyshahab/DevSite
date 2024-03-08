"use client";
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import Landing from "./component/layout/landing/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Loader from "./component/smallerComponent/Loader";
import Navbar from "./component/smallerComponent/navbar/Navbar";
import { ToastContainer } from "./component/smallerComponent/Toast";
import "react-toastify/dist/ReactToastify.css";
import RoomGuard from "./component/smallerComponent/RoomGuard";
import AuthGuard from "./component/smallerComponent/AuthGuard";
import LoggedInUser from "./component/smallerComponent/LoggedInUser";
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
              path="*"
              element={
                <AuthGuard>
                  <LoggedInUser>
                    <RoomGuard />
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
