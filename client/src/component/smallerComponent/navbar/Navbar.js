import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import DropDown from "../DropDown/DropDown";
import { alertUser } from "../../../commonFunction/commonFunction";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  const settingButtonRef = useRef(null);

  const handleLogoutClick = async () => {
    if (await alertUser("logoutUser")) {
      localStorage.clear();
    }
    navigate("/");
  };

  const button = [
    {
      label:
        ' <i class="fa-solid fa-arrow-right-from-bracket"></i> <span>Logout</span>',
      onClick: handleLogoutClick,
    },
  ];

  return (
    <div className="navbarContainer ">
      <div>
        <h2 style={{ textDecoration: "none", color: "white" }}>
          <i className="fas fa-code settingButton "></i> DevSite{" "}
        </h2>
      </div>
      <div>
        <ul>
          <DropDown
            mainButton={<i className="fa-solid fa-gear"></i>}
            mainButtonRef={settingButtonRef}
            buttons={button}
          />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
