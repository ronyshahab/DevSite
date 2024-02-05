import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import { Alert } from "../smallerComponent/Toast";
import { registerSchema } from "../../validation/Validation";
import RegisterImage from "../../assets/photo-editing-software-illustration-design-concept-illustration-websites-landing-pages-mobile-applications-posters-banners_108061-917.avif";
import { setCurrentUser } from "../../redux/slices/CurrentUser.slice";
const bcrypt = require("bcryptjs");

const Register = ({ show, handleClose, openLogin }) => {
  const navigate = useNavigate();

  const [uploadImage, setUploadImage] = useState(null)

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const postUser = async (values) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/user`, values, config);
      // setCurrentUser(res.data.email)
      if (res) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", formik.values.email);
        Alert("success", "User registered Successfully");
        navigate("/posts");
      } else {
        Alert("danger", "Something went wrong");
      }
    } catch (error) {
      Alert("error", error.response.data.error);
    }
  };

  const validator = async (userData, registerData) => {
    const userPassword = userData.password;
    const registerPassword = registerData.password;

    const result = await bcrypt.compare(registerPassword, userPassword);
    if (result) {
      // Do something if passwords match
    }
  };

  const formData = new FormData();
  const handleSubmit = async (values) => {
    formData.append("profileImage", uploadImage);
    formData.append("name", formik.values.name);
    formData.append("email", formik.values.email);
    formData.append("password", formik.values.password);
    
    const user = await postUser(formData);

    if (user) {
      validator(user, values);
    }
  };

  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
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
                  value={formik.values.name}
                  isInvalid={formik?.errors?.name && formik.touched.name}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <Form.Control.Feedback type="invalid">
                    <small style={{ color: "red" }}>
                      *{formik.errors.name}
                    </small>
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={formik.handleChange}
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
              <Form.Group className="mt-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  minLength="6"
                  name="password"
                  onChange={formik.handleChange}
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
              <Form.Group className="mt-3">
                <Form.Label>Profile Img:</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Select a profile img"
                  name="avatar"
                  accept="image/*"
                  onChange={(e) => setUploadImage(e.target.files[0])}

                  // onBlur={formik.handleBlur}
                />
                {/* {formik.touched.avatar && formik.errors.avatar && (
                  <Form.Control.Feedback type="invalid">
                    <small style={{ color: "red" }}>
                      *{formik.errors.avatar}
                    </small>
                  </Form.Control.Feedback>
                )} */}
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
            {/* Replace the placeholder image source with your actual image source */}
            <img src={RegisterImage} alt="" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
