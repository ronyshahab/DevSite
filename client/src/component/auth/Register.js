import React, { useState } from "react";
import { Link} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
const bcrypt = require("bcryptjs");
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const dispatch = useDispatch();
  const getUser = async (email) => {
    const allUser = await axios.get(`http://localhost:5000/api/user/${email}`);
    const user = allUser.data[0];
    return user;
  };
  const validator = async(userData, registerData) => {
   const userPassword = userData.password
   const registerPassword = registerData.password

    const result = await bcrypt.compare(registerPassword, userPassword);
     if(result){
      // dispatch(setAlert(""))
     }

    
    
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await getUser(formData.email);
   
    if(user){
      validator(user, formData);
    }
  };


  return (
    <>
      <section className="container">
        {/* <Alert /> */}
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form"  onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <small className="form-text">
              This site uses Gravatar, so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              minLength="6"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              minLength="6"
              name="password2"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input
            type="submit"
            value="Register"
            className="btn btn-primary"
            name="submit"
            onSubmit={(e) => handleSubmit(e)}
          />
        </form>
        <p className="my-1">
          Already have an account? <Link to={"/login"}>Sign In</Link>
        </p>
      </section>
    </>
  );
};

export default Register;
