import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getData from "../../../commonFunction/getDataFromAxios";
import { useNavigate } from "react-router-dom";
import { Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { resetCurrentUser } from "../../../redux/slices/CurrentUser.slice";
import "./group.css";
import Follow from "../../smallerComponent/follow/Follow";

const Group = ({ show, setShow }) => {
  const [followerData, setFollowerData] = useState(null);
  const currentUser = useSelector((s) => s.currentUser);
  const newMsg = useSelector((s) => s.newMsg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const followerArray = currentUser?.user?.followers;
    if (followerArray) {
      const totalArray = [...newMsg];
      followerArray.forEach((element) => {
        if (!newMsg.includes(element)) {
          totalArray.push(element);
        }
      });
      const config = { followerArray: totalArray };
      if (currentUser?.user?.followers) {
        getData(
          "post",
          "http://localhost:5000/api/user/followerData/followers",
          config,
          setFollowerData
        );
      }
    }
  }, [currentUser]);

  const handleSubmit = (value) => {
    if (value) {
      const res = followerData.filter((element) =>
        element.name.includes(value)
      );
      setFollowerData(res);
    } else {
      dispatch(resetCurrentUser());
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    onSubmit: handleSubmit,
  });

  useEffect(() => {
    handleSubmit(formik.values.name);
  }, [formik.values.name]);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <div className="groupHeaderContainer">
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
        </Modal.Header>
        <Modal.Body>
          <div className=" followerWrapper">
            {followerData &&
              followerData.map((element, index) => {
                return (
                  <div key={index} className="followeListContainer">
                    <div
                      className="followerContainer"
                      onClick={() => navigate(`/profile/${element.id}`)}
                    >
                      <div className={`imgContainer ${newMsg.includes(element.id)? "hasNewMsg" : ''}`}>
                        <img
                          src={element.avatar}
                          className="icon-large"
                          alt=""
                        />
                        <div className={`hasNewMsgContainer ${newMsg.includes(element.id)? "hasNewMsg" : ''}`}></div>
                      </div>
                      <div>{element.name}</div>
                    </div>
                    <div className="buttonContainer">
                      <Follow id={element.id} />
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setShow(false);
                          navigate(`/chat/${element.id}`);
                        }}
                      >
                        Chat
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Group;
