import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({name,link}) => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector{" "}
        </Link>
      </h1>
      <ul>
        <li>
          <Link to={link[0]}>{name[0]}</Link>
        </li>
        <li>
          <Link to={link[1]}>{name[1]}</Link>
        </li>
        <li>
          <Link to={link[2]}>{name[2]}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
