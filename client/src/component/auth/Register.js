import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import RegisterImage from "../../assets/photo-editing-software-illustration-design-concept-illustration-websites-landing-pages-mobile-applications-posters-banners_108061-917.avif";
import axios from "axios";
import { useFormik } from "formik";
import { Alert } from "../smallerComponent/Toast";
const bcrypt = require("bcryptjs");
const Register = ({ show, handleClose, openLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postUser = async (object) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/user`, object);
      if (res) {
        Alert("success", "User registered Successfully");
        navigate("/dashboard");
      } else {
        Alert("danger", "Something went wrong");
      }
    } catch (error) {
      // console.log(error);
      Alert("error", error.response.data.error);
    }
  };
  const validator = async (userData, registerData) => {
    const userPassword = userData.password;
    const registerPassword = registerData.password;

    const result = await bcrypt.compare(registerPassword, userPassword);
    if (result) {
    }
  };

  const handleSubmit = async (e) => {
    const user = await postUser(formik.values);

    if (user) {
      validator(user, formData);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <Modal show={show} size="lg">
      <div className="modalHeaderContainer">
        <div>
          <h1>Sign Up</h1>
          <small>
            Already have an account?{" "}
            <a onClick={openLogin}>
              {" "}
              <span className="text-primary"> login in </span>
            </a>{" "}
          </small>
        </div>
      </div>
      <Modal.Body>
        <div className="modalBodyContainer">
          <div className="formContainer">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mt-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={formik.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  minLength="6"
                  name="password"
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  minLength="6"
                  name="password2"
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <div className="btnContiner" style={{ marginTop: "1em" }}>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  Go back
                </Button>
              </div>
            </Form>
          </div>
          <div className="modalImgContainer">
            <img src={RegisterImage} alt="" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
