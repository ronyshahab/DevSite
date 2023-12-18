import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button, FormGroup } from "react-bootstrap";
import { Alert } from "../smallerComponent/Toast";
import { useFormik } from "formik";
import { loginSchema } from "../../validation/Validation";
import LoginImage from "../../assets/illustration-cartoon-female-user-entering-login_241107-682.avif";
const bcrypt = require("bcryptjs");

function Login({ show, handleClose, openRegister }) {
  const navigate = useNavigate();

  let TOKEN;

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Alert("error", "No token found", "light");
      return;
    }
    try {
      const user = await axios.get(`http://localhost:5000/api/profile/me`, {
        headers: {
          token,
        },
      });
      console.log(user.response.status);
      if (user.response.status !== 200) {
        console.log("something went bad");
        navigate("/dashboard");
      }
      return user;
    } catch (error) {
      console.log(error);
    }
    // const user = allUser.data[0];
  };

  const getToken = async (value) => {
    const { email, password } = value;
    try {
      const data = await axios.post(`http://localhost:5000/api/auth`, {
        email,
        password,
      });

      TOKEN = data.data.token;
      localStorage.setItem("token", TOKEN);
      if (formik.values.rememberMe) {
        localStorage.setItem("email", formik.values.email);
        localStorage.setItem("password", formik.values.password);
        localStorage.setItem("rememberMe", formik.values.rememberMe);
      } else {
        localStorage.setItem("email", "");
        localStorage.setItem("password", "");
        localStorage.setItem("rememberMe", "");
      }
      navigate("/posts");
    } catch (error) {
      console.log(error.message);
    }
  };

  const validator = async (userData, registerData) => {
    if (userData !== undefined && registerData !== undefined) {
      const userPassword = userData.password;
      const registerPassword = registerData.password;

      const result = await bcrypt.compare(registerPassword, userPassword);
      if (result) {
        localStorage.setItem("user", userData._id);
        Alert("success", "Login Successfull");
      }

      if (!result) {
        Alert("error", "Wrong Creadtial", "light");
      }
    }
  };

  const handleSubmit = async (e) => {
    let result = "";
    result = await getUser(e.email);
    if (result !== "") {
      getToken(e);
      validator(result, formik.values);
    }
  };

  const toggleRememberMe = () => {
    formik.setValues({
      email: formik.values.email,
      password: formik.values.password,
      rememberMe: !formik.values.rememberMe,
    });
  };

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
      password: localStorage.getItem("password")
        ? localStorage.getItem("password")
        : "",
      rememberMe: localStorage.getItem("rememberMe") ? true : false,
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Modal show={show} size="lg">
      <div className="modalHeaderContainer">
        <div>
          <h1>Login In</h1>
          <small>
            Not have account?{" "}
            <a onClick={openRegister}>
              {" "}
              <span className="text-primary"> sign in </span>
            </a>{" "}
          </small>
        </div>
      </div>
      <Modal.Body>
        <div className="modalBodyContainer">
          <div className="formContainer">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  onChange={formik.handleChange}
                  placeholder="Enter email"
                  value={formik.values.email}
                  isInvalid={formik?.errors?.email && formik.touched.email}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <Form.Control.Feedback type="invalid">
                    <small style={{ color: "red" }}>
                      *{formik.errors.email}
                    </small>
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  placeholder="Password"
                  value={formik.values.password}
                  isInvalid={
                    formik?.errors?.password && formik.touched.password
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <Form.Control.Feedback type="invalid">
                    <small style={{ color: "red" }}>
                      *{formik.errors.password}
                    </small>
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <FormGroup className="mb-3" controlId="formBasicPassword">
                <Form.Check
                  name="rememberMe"
                  checked={formik.values.rememberMe}
                  onChange={toggleRememberMe}
                />{" "}
                <span>RememberMe </span>
              </FormGroup>

              <Button variant="primary" type="submit">
                Submit
              </Button>

              <Button variant="danger" onClick={handleClose}>
                Go back
              </Button>
            </Form>
          </div>
          <div className="modalImgContainer">
            <img src={LoginImage}></img>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
