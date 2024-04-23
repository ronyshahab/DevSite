import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { capitalize } from "../../../commonFunction/commonFunction";
import { useDispatch, useSelector } from "react-redux";
import Education from "./Education";
import Experience from "./Experience";
import List from "../../smallerComponent/List";
import Loader from "../../smallerComponent/Loader";
import getData from "../../../commonFunction/getDataFromAxios";
import {
  resetCurrentUser,
  setCurrentUser,
} from "../../../redux/slices/CurrentUser.slice";
import axios from "axios";
import "./profile.css";
import ShowPost from "../posts/ShowPost";
import Follow from "../../smallerComponent/follow/Follow";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState();
  const [postData, setPostData] = useState();
  const { id } = useParams();
  const [profileImgData, setProfileImgData] = useState();
  const fileInputRef = useRef();
  let currentUser = useSelector((s) => s.currentUser);

  const fetchData = async() => {
    const userId = id ? id : currentUser?.user?._id;
    try {
      const data =await getData(
        "get",
        `http://localhost:5000/api/profile/user/${userId}`,
        {},
        setProfileData
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostData = () => {
    try {
      if (profileData.user?._id) {
        getData(
          "get",
          `http://localhost:5000/api/post/user/${profileData.user?._id}`,
          {},
          setPostData
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  let element;
  useEffect(() => {
    if (profileData?.msg == "there is no profile of this user") {
      navigate("/create-profile");
    }

    profileData?.user && setProfileImgData(profileData.user.avatar);
  }, [profileData]);

  if (profileData && Object.keys(profileData).length !== 0) {
    if (profileData.skills) {
      const skillsArray = profileData.skills;
      element = skillsArray.map((i) => {
        return (
          <li key={i}>
            {" "}
            <i
              className="fa-solid fa-check"
              style={{ color: "lightgreen" }}
            ></i>{" "}
            {capitalize(i)}
          </li>
        );
      });
    }
  }
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleImageClick = () => {
    if (id == currentUser.user._id) {
      fileInputRef.current.click();
    }
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      token: localStorage.getItem("token"),
    },
  };

  const changeProfileImg = async () => {
    const formData = new FormData();

    formData.append("profileImg", profileImgData);
    try {
      const data = await axios.post(
        `http://localhost:5000/api/profile/me`,
        formData,
        config
      );
      setProfileImgData(data.data?.profile?.avatar)
      if (data.status === 200) {
        dispatch(resetCurrentUser());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof profileImgData === "object") {
      changeProfileImg();
    }
  }, [profileImgData]);

  const handleChange = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (profileData) {
      fetchPostData();
    }
  }, [profileData]);

  return (
    <>
      {profileData &&
      profileData.skills &&
      Object.keys(profileData).length !== 0 ? (
        <>
          <div className="container">
            <div className="btnContainer">
              {id && currentUser.user?._id !== id ? (
                <>
                  <button
                    className="btn btn-primary"
                    style={{ marginBottom: "1em" }}
                    onClick={() => navigate(`/chat/${id}`)}
                  >
                    Message
                  </button>
                  <Follow id={id} />
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  style={{ marginBottom: "1em" }}
                  onClick={handleChange}
                >
                  Dashboard
                </button>
              )}

              <button
                className="btn btn-primary"
                style={{ marginBottom: "1em" }}
                onClick={() => navigate("/posts")}
              >
                Posts
              </button>
            </div>

            <div className="profileContainer">
              <div className="profileBanger">
                <div
                  className="profileImgContainer"
                  style={{ marginTop: "1em" }}
                >
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => setProfileImgData(e.target.files[0])}
                  />
                  <img
                    src={profileImgData}
                    className="round-img"
                    alt=""
                    onClick={handleImageClick}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div
                  className="profileInfoContainer"
                  style={{ textAlign: "center" }}
                >
                  <h2 className="profileName">
                    {capitalize(profileData.user.name)} <br />
                  </h2>
                  <p>
                    {profileData.years == null || profileData.years == undefined
                      ? "Fresher"
                      : "Experience: " + profileData.years + " years"}
                  </p>
                  <p>
                    {profileData.githubusername
                      ? "Github username: " + profileData.githubusername
                      : null}
                  </p>
                  <p className="profileWork">
                    {capitalize(profileData.status)} ,{" "}
                    {capitalize(profileData.company)}
                  </p>
                  <p className="profileWorkLocation">
                    At, {capitalize(profileData.location)}
                  </p>
                  <ul>
                    <List
                      data={profileData.social ? profileData.social : null}
                    />
                  </ul>
                </div>
              </div>
              <div className="websiteContainer mt-3">
                <h2 className="text-primary">PortFolio website:</h2>
                <p>
                  {profileData.website ? (
                    <a
                      href={profileData.website}
                      style={{ fontFamily: "monospace" }}
                    >
                      Click here
                    </a>
                  ) : null}
                </p>
              </div>
              <div className="profileDetail">
                <div className="profileBio">
                  <h2 className="text-primary">
                    {capitalize(profileData.user.name)}
                    <sup>'s</sup> Bios
                  </h2>
                  <p style={{ whiteSpace: "pre-wrap" }}>{profileData.bio}</p>
                </div>
                <div className="skillSets ">
                  <h2 className="text-primary">Skills</h2>
                  <ul>{element}</ul>
                </div>
              </div>

              <div className="eduExpContainer">
                <div className="expsContainer">
                  {profileData.experience.length !== 0 && (
                    <div className="expContainer">
                      <h2 className="text-primary">Experience</h2>
                      {profileData.experience.map((i, index) => {
                        return <Experience data={i} key={index} />;
                      })}
                    </div>
                  )}
                </div>
                {profileData.education.length !== 0 && (
                  <div className="eduContainer">
                    <h2 className="text-primary">Education</h2>
                    {profileData.education.map((i, index) => {
                      return <Education data={i} key={index} />;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="profilePostContainer">
            {postData?.length > 0 ? (
              <>
                <div className="profilePost">
                  {postData.map((post, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => navigate(`/post/${post._id}`)}
                      >
                        <ShowPost content={post.content} />
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default Profile;
