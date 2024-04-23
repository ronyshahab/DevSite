import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getData from "../../../commonFunction/getDataFromAxios";
import ShowPost from "./ShowPost";
import "./post.css";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { Alert } from "../../smallerComponent/Toast";
import { commentSchema } from "../../../validation/Validation";
import TrashIcon from "../../../assets/icons/trash-solid.svg";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Post = () => {
  const [currentPost, setCurrentPost] = useState();
  const postId = useParams().id;
  const navigate = useNavigate();
  const currentUser = useSelector((s) => s.currentUser);
  const fetchPost = async (method, url, data) => {
    const result = await getData(method, url, data);
    setCurrentPost(result.data);
  };

  const handleSubmit = async (value) => {
    const content = value;
    const data = await getData(
      "post",
      `http://localhost:5000/api/post/comment/${postId}`,
      content
    );
    if (data.status == 200) {
      Alert("success", "Comment Added Successfully");
      setCurrentPost(data.data);
    } else {
      Alert("warning", "Something went wrong");
    }
  };
  const showAlert = async () => {
    const result = await Swal.fire({
      title: "Item will be deleted permanently?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      return true;
    } else if (result.isDismissed) {
      return false;
    }
  };

  const handleDelete = async (e) =>{
    try {
      if(await showAlert()){

        const data = await getData('delete', `/post/comment/${postId}/${e._id}`)
        if(data.status === 200){
          Alert("success", "Comment Removed Successfully");
          setCurrentPost(data.data);
          
        }else{
          Alert("warning", "Something went wrong");
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: commentSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!currentPost) {
      fetchPost("get", `http://localhost:5000/api/post/${[postId]}`);
    }
  }, [currentPost]);

  return (
    <div>
      {currentPost && (
        <section className="container">
          <a onClick={() => navigate(-1)} className="btn">
            Back To Posts
          </a>
          <div className="singlePostContainer bg-white p-1 my-1">
            <div>
              <img
                className="round-img postProfileImg"
                src={currentPost.avatar}
                alt=""
              />
              <h4 className="postUserName">{currentPost.name}</h4>
            </div>
            <div className="postContentContainer">
              <ShowPost content={currentPost.content} />
            </div>
          </div>

          <div className="post-form">
            <div className="post-form-header bg-primary">
              <h3>Leave A Comment</h3>
            </div>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mt-3">
                <Form.Control
                  as="textArea"
                  placeholder="Write something..."
                  name="content"
                  onChange={formik.handleChange}
                  value={formik.values.content}
                  style={{ height: "200px" }}
                  isInvalid={formik?.errors?.content && formik.touched.content}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.content && formik.errors.content && (
                  <Form.Control.Feedback type="invalid">
                    <small style={{ color: "red" }}>
                      *{formik.errors.content}
                    </small>
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
          </div>
          {currentUser.user &&
            currentPost.comments.length > 0 &&
            currentPost.comments.map((comment, index) => (
              <div className="commentContainer" key={index}>
                <div>
                  {" "}
                  <div>
                    <img className="round-img" src={comment.avatar} alt="" />
                    <h6>{comment.name}</h6>
                  </div>
                  <div>
                    <p className="my-1 commentContentContainer">
                      {comment.content}
                    </p>
                  </div>
                </div>

                {currentUser?.user._id === comment.user && (
                  <div onClick={()=>handleDelete(comment)} >
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "red" }}
                    ></i>
                  </div>
                )}
              </div>
            ))}
        </section>
      )}
    </div>
  );
};

export default Post;
