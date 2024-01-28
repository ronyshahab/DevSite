import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import DropDown from "../DropDown/DropDown";
import { alertUser } from "../../../commonFunction/commonFunction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCurrentUser } from "../../../redux/slices/CurrentUser.slice";
import GearIcon from "../../../assets/icons/white-gear-solid.svg"
import CodeIcon from "../../../assets/icons/code-solid.svg"
import LogoutIcon from "../../../assets/icons/right-from-bracket-solid.svg"
const Navbar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  const settingButtonRef = useRef(null);

  const handleLogoutClick = async () => {
    if (await alertUser("logoutUser")) {
      localStorage.clear();
      dispatch(resetCurrentUser())
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
          <img src={CodeIcon}  className="icon-large  settingButton "></img> DevSite{" "}
        </h2>
      </div>
      <div>
        <ul>
          <DropDown
            mainButton={<img  src={GearIcon} className="icon " ></img>}
            mainButtonRef={settingButtonRef}
            buttons={button}
          />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
