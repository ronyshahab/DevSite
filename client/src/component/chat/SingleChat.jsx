import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import getData from "../../commonFunction/getDataFromAxios";
import { useParams } from "react-router-dom";
import "./singleChat.css";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const SingleChat = () => {
  const requestedUserId = useParams().id;

  const currentUser = useSelector((s) => s.currentUser);
  const [data, setData] = useState(null);
  const [chatImg, setChatImg] = useState();
  const roomJoined = useRef(false);
  const handleSubmit = async (value) => {
    await fetchData("post", `/chat/${requestedUserId}`, value);
    socket.emit("changeMsg", data._id);
  };

  const fetchData = async (method, url, config) => {
    try {
      const data = await getData(method, url, config, setData);
      if (data) {
        const profileImg = await getData(
          "get",
          `/profile/user/${requestedUserId}`
        );
        setChatImg(profileImg.data.user.avatar);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      message: "",
    },

    onSubmit: handleSubmit,
  });

  const socket = useMemo(() => io("http://localhost:5000"), []);

  const scrollDivToBottom = () => {
    const div = document.getElementById("messageContainer");
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  };

  useEffect(() => {
    scrollDivToBottom();
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    scrollDivToBottom();
    if (!data) {
      fetchData("get", `/chat/${requestedUserId}`);
    }
    if (!roomJoined.current && data?._id) {
      roomJoined.current = true;
      socket.emit("joinRoom", data._id);
    }
    socket.on("newMessage", () => {
      console.log("new message recieved");
      fetchData("get", `/chat/${requestedUserId}`);
    });

    socket.on("response", () => {
      console.log("response recived from server");
    });
  }, [data]);

  return (
    <div className="chatContainer container">
      <div className="profileImg">
        <img className="round-img img" src={chatImg} alt="" />
      </div>
      <div id="messageContainer" className="messageContainer">
        {data &&
          data.messages &&
          currentUser.user &&
          
          data.messages.map((message, index) => {
            return (
              <div className="singleMessageContainer" key={index}>
                <div
                  className={`message ${
                    message.sender === currentUser.user._id
                      ? "myMessage"
                      : "otherMessage"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            );
          })}
      </div>
      <div className="chatInputContainer">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mt-3">
            <div className="chatInputControl">
              {" "}
              <Form.Control
                placeholder="Write something..."
                name="message"
                onChange={formik.handleChange}
                value={formik.values.message}
                isInvalid={formik?.errors?.message && formik.touched.message}
                onBlur={formik.handleBlur}
              />
              {formik.touched.message && formik.errors.message && (
                <Form.Control.Feedback type="invalid">
                  <small style={{ color: "red" }}>
                    *{formik.errors.message}
                  </small>
                </Form.Control.Feedback>
              )}
              <button className="chatBtn btn btn-primary" type="submit">
                Send
              </button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default SingleChat;
