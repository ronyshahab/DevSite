import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ name, link }) => {
  return (
    <div className="navbarContainer ">
      <div>
        <h3>
          <Link to="/" style={{ textDecoration: "none" }}>
            <i className="fas fa-code"></i> DevSite{" "}
          </Link>
        </h3>
      </div>
      <div>
        <ul>
          <li>
            <Link to={link[0]}>{name[0]}</Link>
          </li>
          <li>
            <Link to={link[1]}>{name[1]}</Link>
          </li>
          {/* <li>
            <Link to={link[2]}>{name[2]}</Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
