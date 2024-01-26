import React from "react";
import axios from "axios";
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button, FormGroup } from "react-bootstrap";
import { Alert } from "../smallerComponent/Toast";
import { useFormik } from "formik";
import { loginSchema } from "../../validation/Validation";
import LoginImage from "../../assets/illustration-cartoon-female-user-entering-login_241107-682.avif";
import { setCurrentUser } from "../../redux/slices/CurrentUser.slice";

function Login({ show, handleClose, openRegister }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  let TOKEN;

  const getToken = async (value) => {
    const { email, password } = value;
    try {
      const data = await axios.post(`http://localhost:5000/api/auth`, {
        email,
        password,
      });
      if(data.data.errors){
        Alert("error", "Invalid Credentials", "light");
        return
      }
      Alert("success", "Login Successfull")
      dispatch(setCurrentUser(data.data.email))
      TOKEN = data.data.token;
      localStorage.setItem("token", TOKEN);
      localStorage.setItem("email", formik.values.email);
      if (formik.values.rememberMe) {
        localStorage.setItem("password", formik.values.password);
        localStorage.setItem("rememberMe", formik.values.rememberMe);
      } else {
        localStorage.setItem("password", "");
        localStorage.setItem("rememberMe", "");
      }
      navigate("/posts");
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleSubmit = async (e) => {
      getToken(e);
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
      email: localStorage.getItem("rememberMe") ? localStorage.getItem("email") : "",
      password: localStorage.getItem("rememberMe")
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
