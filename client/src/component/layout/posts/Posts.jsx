import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextEditor from '../../smallerComponent/TextEditor/TextEditor';
import axios from "axios"
import getData from "../../../commonFunction/getDataFromAxios";
// import {Content} from "tiptap"
import "./post.css"
const Posts = () => {
  const navigate = useNavigate();

  const [postArray , setPostArray ] = useState([])
  
  const fetchPost = async (method, url, data) => {
    const result = await getData(method, url, data);
    setPostArray(prevPostArray => [...prevPostArray, ...result.data]);  };

  const handleSubmission = async (submittedContent) => {
    const formData = new FormData()
    submittedContent.content.forEach((obj)=>{
      if( obj.type === 'image'){
        const byteCharacters = atob(obj.attrs.src.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        formData.append("images", blob)
      }
    })
    formData.append('content', JSON.stringify(submittedContent))
 
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
          "token": localStorage.getItem("token")
      },
    };

    try {
      const data =  await axios.post(`http://localhost:5000/api/post`, formData, config);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchPost("get",'http://localhost:5000/api/post')
    
  },[])

  useEffect(()=>{
    if(postArray.length>1){
      console.log(postArray[0].content)
    }
  },[postArray])
  

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
          >
            Say something
          </p>
          <TextEditor onSubmit={handleSubmission}/>
        </div>
        {
          postArray.map((post)=>
            (
              <div className="postContainer">
              <div className="postImg">
                <img
                  src={post.avatar}
                  className="round-img profileImg"
                  style={{ marginTop: "2em" }}
                  alt=""
                />
                <p className="text-primary"> {post.name}</p>
              </div>
              <div className="postDetail">
                <div className="postText">
                </div>
                <div className="postCount">
                  <button>
                    <i className="fa-solid fa-thumbs-up"></i>4
                  </button>
                  <button>
                    <i className="fa-solid fa-thumbs-down"></i>
                  </button>
                  <Link to={"/post"}>
                    {" "}
                    <button className="btn btn-primary">Discussion</button>{" "}
                  </Link>
                </div>
              </div>
            </div> 
            )
          )
        }
      </div>
    </div>
  );
};

export default Posts;
