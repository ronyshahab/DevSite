import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextEditor from "../../smallerComponent/TextEditor/TextEditor";
import axios from "axios";
import getData from "../../../commonFunction/getDataFromAxios";
// import {Content} from "tiptap"
import "./post.css";
import ShowPost from "./ShowPost";
import { useSelector } from "react-redux";
const Posts = () => {
  const navigate = useNavigate();

  const [postArray, setPostArray] = useState([]);
  const [showTextArea, setShowTextArea] = useState(false);
  const currentUser = useSelector((s) => s.currentUser);

  const fetchPost = async (method, url, data) => {
    const result = await getData(method, url, data);
    if (result) {
      setPostArray([...result.data]);
    }
  };

  const handleSubmission = async (submittedContent) => {
    const formData = new FormData();
    formData.append("content", submittedContent);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        token: localStorage.getItem("token"),
      },
    };

    try {
      await axios.post(`http://localhost:5000/api/post`, formData, config);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!postArray.length) {
      fetchPost("get", "http://localhost:5000/api/post");
    }
  }, [postArray]);

  useEffect(()=>{
    if(currentUser.msg){
      navigate("/create-profile")
    }
  },[currentUser])

  const addLike = async (post) => {
    const data = await getData(
      "put",
      `http://localhost:5000/api/post/likes/${post._id}`
    );
    if (data.status == 200) {
      fetchPost("get", "http://localhost:5000/api/post");
    }
  };

  return (
    <div>
      <div className="container">
        <button
          className="btn btn-primary"
          style={{ marginBottom: "1em" }}
          onClick={() => navigate("/profile")}
        >
          Go to dashboard
        </button>
        <div className="postsIntro">
          <h2 className="text-primary">
            <p>Posts</p>
          </h2>
          <p>
            <i className="fa-sharp fa-solid fa-people-simple"></i> Welcome to
            community
          </p>
          <p
            className="btn btn-primary"
            style={{ color: "white", width: "100vw", marginRight: "160px" }}
            onClick={() => setShowTextArea((pre) => !pre)}          >
            Say something
          </p>
          {showTextArea && <TextEditor onSubmit={handleSubmission} />}
        </div>
        {postArray.length > 0 &&
          currentUser &&
          currentUser.user ?
          postArray.map((post, index) => (
            <div className="postContainer" key={index}>
              <div className="postImg">
                <img
                  src={post.avatar}
                  className="round-img profileImg"
                  style={{ marginTop: "2em" }}
                  alt=""
                  onClick={() => navigate(`/profile/${post.user}`)}
                />
                <p className="text-primary"> {post.name}</p>
              </div>
              <div className="postDetail">
                <div className="postText">
                  <ShowPost content={post.content} />
                </div>
                <div className="postCount">
                  <button onClick={() => addLike(post)}>
                    {post.likes.find(
                      (like) => like.user === currentUser.user._id
                    ) ? (
                      <span>
                        <i
                          style={{ color: "#4b2fcc" }}
                          className="fa-solid fa-thumbs-up"
                        ></i>{" "}
                        {post.likes.length}
                      </span>
                    ) : (
                      <span>
                        {" "}
                        <i className="fa-solid fa-thumbs-up"></i>{" "}
                        {post.likes.length > 0 && post.likes.length}
                      </span>
                    )}
                  </button>
                  <Link to={`/post/${post._id}`}>
                    <button className="btn btn-primary">Discussion</button>{" "}
                  </Link>
                </div>
              </div>
            </div>
          )) : <div className="warningContainer">
              <h2>Please make a profile to see post</h2>
            </div>}
      </div>
    </div>
  );
};

export default Posts;
