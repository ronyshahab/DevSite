import React from "react";
import { Link } from "react-router-dom";


const Profiles = () => {

  return (
    <div>

      <section className="container">
        <h1 className="text-primary">DevConnector</h1>
        Browse and connect with people
        <div className="cardContainer">
          <div className="card">
            <div className="imgContainer roundImg">
              <img
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                className="round-img profileImg"
              ></img>
            </div>
            <div className="profileInfo">
              <h1> John Doe</h1>
              <p id="currentWork">Microsoft wendeveloper, at surat</p>
              <p className=" btn">
                {" "}
                <Link to={"/profile"}>My Profile</Link>{" "}
              </p>
            </div>
            <div className="profileSkill">
              <ul>
                <li>html</li>

                <li>css</li>
                <li>Javascipt</li>
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="imgContainer roundImg">
              <img
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                className="round-img profileImg"
              ></img>
            </div>
            <div className="profileInfo">
              <h1> John Doe</h1>
              <p id="currentWork">Microsoft wendeveloper, at surat</p>
              <p className=" btn">
                {" "}
                <Link to={"/profile"}>My Profile</Link>{" "}
              </p>
            </div>
            <div className="profileSkill">
              <ul>
              
                <li>html</li>

                <li>css</li>
                <li>Javascipt</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profiles;
