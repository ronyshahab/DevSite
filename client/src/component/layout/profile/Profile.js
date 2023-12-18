import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../../commonFunction/commonFunction";
import { setCurretnUserProfileDataAction } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Education from "./Education";
import Experience from "./Experience";
import List from "../../smallerComponent/List";
import Loader from "../../smallerComponent/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let element;

  const profileData = useSelector((s) => s.setCurrentUserProfileDataReducer);
  useEffect(() => {
    dispatch(setCurretnUserProfileDataAction());
  }, []);

  useEffect(() => {
    if (profileData.msg == "there is no profile of this user") {
      navigate("/create-profile");
    }
  }, [profileData]);

  if (Object.keys(profileData).length !== 0) {
    if (profileData.skills) {
      const skillsArray = profileData.skills;
      element = skillsArray.map((i) => {
        return (
          <li key={i}>
            {" "}
            <i
              class="fa-solid fa-check"
              style={{ color: "lightgreen" }}
            ></i>{" "}
            {capitalize(i)}
          </li>
        );
      });
    }
  }

  const handleChange = () => {
    navigate("/dashboard");
  };

  return (
    <>
      {profileData.skills && Object.keys(profileData).length !== 0 ? (
        <div className="container">
          <button
            className="btn btn-primary"
            style={{ marginBottom: "1em" }}
            onClick={handleChange}
          >
            Dashboard
          </button>
          <button
            className="btn btn-primary"
            style={{ marginBottom: "1em" }}
            onClick={() => navigate("/posts")}
          >
            Posts
          </button>

          <div className="profileContainer">
            <div className="profileBanger">
              <div className="profileImgContainer" style={{ marginTop: "1em" }}>
                <img
                  src={`${profileData.user.avatar}`}
                  className="round-img"
                  alt=""
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
                  <List data={profileData.social ? profileData.social : null} />
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
                    {profileData.experience.map((i) => {
                      return <Experience data={i} key={i.title} />;
                    })}
                  </div>
                )}
              </div>
              {profileData.education.length !== 0 && (
                <div className="eduContainer">
                  <h2 className="text-primary">Education</h2>
                  {profileData.education.map((i) => {
                    return <Education data={i} key={i.school} />;
                  })}
                </div>
              )}
            </div>
            {/* <div className="githubContainer">
              <h2 className="text-primary">
                <i className="fa-brands fa-github"></i> Github Repos
              </h2>
              <div className="repo1 repo">
                <div className="repoInfoContainer">
                  <p className="text-primary">Repo one</p>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nostrum, optio!
                  </p>
                </div>
                <div className="repoBadgeContainer">
                  <div className="repoStar">Star:4.4</div>
                  <div className="repoWatcher">Watchers:40</div>
                  <div className="repoForks">Forks:25</div>
                </div>
              </div>
              <div className="repo1 repo">
                <div className="repoInfoContainer">
                  <p className="text-primary">Repo one</p>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nostrum, optio!
                  </p>
                </div>
                <div className="repoBadgeContainer">
                  <div className="repoStar">Star:4.4</div>
                  <div className="repoWatcher">Watchers:40</div>
                  <div className="repoForks">Forks:25</div>
                </div>
              </div>
              <div className="repo1 repo">
                <div className="repoInfoContainer">
                  <p className="text-primary">Repo one</p>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nostrum, optio!
                  </p>
                </div>
                <div className="repoBadgeContainer">
                  <div className="repoStar">Star:4.4</div>
                  <div className="repoWatcher">Watchers:40</div>
                  <div className="repoForks">Forks:25</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
