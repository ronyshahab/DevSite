import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import DropDown from "../DropDown/DropDown";
import { alertUser } from "../../../commonFunction/commonFunction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCurrentUser } from "../../../redux/slices/CurrentUser.slice";
import GearIcon from "../../../assets/icons/white-gear-solid.svg";
import CodeIcon from "../../../assets/icons/code-solid.svg";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import getData from "../../../commonFunction/getDataFromAxios";
import Suggestion from "../suggestion/Suggestion";

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchedUser, setSearchedUser] = useState(null)

  const isLogin = useSelector( (s) => s.currentUser)

  const settingButtonRef = useRef(null);

  const handleLogoutClick = async () => {
    if (await alertUser("logoutUser")) {
      localStorage.clear();
      dispatch(resetCurrentUser());
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

  const fetchData = async (method,url) =>{
    try {
      const data = await getData(method, url)
      setSearchedUser(data.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSubmit = (value) => {
    if(value){

      setTimeout(() => {
        fetchData("get", `http://localhost:5000/api/user/${value}`)
      }, 200);
    }else{
      setSearchedUser(null)
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    onSubmit: handleSubmit,
  });

  useEffect(()=>{
    handleSubmit(formik.values.name)
  },[formik.values.name])

  return (
    <div className="navbarContainer ">
      <div>
        <h2 style={{ textDecoration: "none", color: "white" }}>
          <img src={CodeIcon} className="icon-large  settingButton "></img>{" "}
          DevSite{" "}
        </h2>
      </div>
      {isLogin._id && (
        <div className="navbarWidgetContainer">
          <div>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name of the user..."
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik?.errors?.name && formik.touched.name}
                  autoComplete="off"
                />
                {formik.touched.name && formik.errors.name && (
                  <Form.Control.Feedback type="invalid">
                    <small style={{ color: "red" }}>
                      *{formik.errors.name}
                    </small>
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Form>
          </div>

          <div>
            <ul>
              <DropDown
                mainButton={<img src={GearIcon} className="icon "></img>}
                mainButtonRef={settingButtonRef}
                buttons={button}
              />
            </ul>
          </div>
          <div className="suggestionContainer">
            <Suggestion data={searchedUser} setData={setSearchedUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
