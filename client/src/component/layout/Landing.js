import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {

  const navigate = useNavigate()
  const user = localStorage.getItem('user')
  console.log(user)
  useEffect(()=>{

    if(user!== undefined && user!==null){
      navigate("/profile")
    }
  })
  return (
    <>
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Landing;
