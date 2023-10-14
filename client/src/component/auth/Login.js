import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-toastify'
import axios from "axios";
import {useNavigate} from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import { Alert } from "../smallerComponent/Toast";
const bcrypt = require("bcryptjs");


function Login() {
  
  // **creating hooks Instance
  const navigate = useNavigate()
  const dispatch = useDispatch()

  let TOKEN


  // **state for storing form Data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  // **destructor email and password property from form data state
  const { email, password } = formData;

  
  // **function created to get data of the specific user
  const getUser = async (email) => {
    const allUser = await axios.get(`http://localhost:5000/api/user/${email}`);
    const user = allUser.data[0];
    return user;
  };


  // **function created to store the token generated into local storage
  const getToken = async (email, password) =>{
    try {
      // sending user login data to the api
      const data = await axios.post(`http://localhost:5000/api/auth`, {email , password})
      
      // setting token into the localStorage
      TOKEN = data.data.token
      localStorage.setItem('token', TOKEN)
      
      // navigating to the profile page
      navigate("/profile")
     
    } catch (error) {
      console.log(error.message)
    }
  }


  // **validator function to check login successfull or not
  const validator = async(userData, registerData) => {
    
    // checking the availablity of the userData 
    if(userData!== undefined && registerData!== undefined){
      const userPassword = userData.password
      const registerPassword = registerData.password
      
      // comapring the passwords to check user authenticity
      const result = await bcrypt.compare(registerPassword, userPassword);
      
      // user login succesfull
      if(result){
        
        localStorage.setItem("user" , userData._id)
        Alert('success', "Login Successfull")
      }

      // user login failed
      if(!result){
        console.log("Alert is called")
        Alert( 'error',"Wrong Creadtial", "light")
        
      }

      // userData not available
    
    }
   };


  // **function to maintain the value of state in form
   const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  // **submit function for form 
  const onSubmit = async(e) => {
    e.preventDefault();
    let result =""
     result = await getUser(email)
    if(result !== ""){
      
      getToken(email, password)
      validator(result, formData)
    }
  };

  return (
    <div>
jj
      <section className="container">
        <Modal>
        {/* <Alert/> */}
        <Modal.Header closeButton>
        <h1 className="large text-primary">Sign In</h1>
        <Modal.Title>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into your account
        </p>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form
          action="dashboard.html"
          className="form"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              minLength="6"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" value="Login"  className="btn btn-primary" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to={"/register"}>Sign Up</Link>
       </p>
       </Modal.Body>
       </Modal>
      </section>
    </div>
  );
}

export default Login;
