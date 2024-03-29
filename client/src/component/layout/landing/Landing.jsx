import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Login from "../../auth/Login";
import Register from "../../auth/Register";
import "./landing.css"
import TyperWriter from "../../smallerComponent/TypeWriter/TyperWriter";
const Landing = () => {
  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const words = ["Developer", "Student", "Blogger", "FreeLancer"]

  let wordIndex = 0
  useEffect(() => {
    if (user !== undefined && user !== null) {
      navigate("/posts");
    }
  });

  const openRegister = () => {
    setLogin(false);
    setRegister(true);
  };
  const openLogin = () => {
    setLogin(true);
    setRegister(false);
  };
  const handleClose = () => {
    setLogin(false);
    setRegister(false);
  };

  return (
    <>
      <div className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <div className="textContainer">
            <h2 className="large text">A Website for <TyperWriter dataArray={['Developers', 'Students', 'Bloggers', "FreeLancers", "Tech-Enthusiasts"]} delay={2000} /></h2>
            </div>
            <p className="lead">
              Create developer profile/portfolio, share posts and get help from
              other developers
            </p>
            <div className="buttons">
              <Link
                className="btn btn-primary"
                onClick={() => setRegister(true)}
              >
                Sign Up
              </Link>
              <Button variant="primary" onClick={() => setLogin(true)}>
                Login
              </Button>
              {showLogin && (
                <Login
                  show={showLogin}
                  handleClose={handleClose}
                  openRegister={openRegister}
                />
              )}
              {showRegister && (
                <Register
                  show={showRegister}
                  handleClose={handleClose}
                  openLogin={openLogin}
                />
              )}
            </div>
          </div>
        </div>
        {/* <div className="landingContaienrImg">
          <img src={LandingImage} alt="" />
        </div> */}
      </div>
    </>
  );
};

export default Landing;
