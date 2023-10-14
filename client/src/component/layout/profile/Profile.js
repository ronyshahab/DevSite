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

  // hooks instance created
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let element;

  // getting data from redux
  const profileData= useSelector(s => s.setCurrentUserProfileDataReducer)
  console.log(profileData)
  // calling action
  useEffect(() => {
   dispatch(setCurretnUserProfileDataAction())
  }, []);

  // checking availablity of the data before execution
   if(Object.keys(profileData).length !== 0) {
    const skillsArray = profileData.skills;
    element = skillsArray.map((i) => {
      return <li key={i}> {capitalize(i)}</li>;
    });
  }

  // function to locate to dashbaord
  const handleChange=() =>{
    navigate("/dashboard")
  }
 
  return (
    
    <>
      {Object.keys(profileData).length !== 0 ? (
        <div className="container">
        <button className="btn btn-primary" style={{marginBottom:'1em'}} onClick={ handleChange}>Dashboard</button>
          
          <div className="profileContainer" >
            <div className="profileBanger" >
              <div className="profileImgContainer" style={{marginTop:'1em'}}>
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
                  {capitalize(profileData.user.name)} <br/>
                </h2>
                <p>{profileData.years == null || profileData.years == undefined? "Fresher" : "Experience: " + profileData.years + " years"}</p>
                  <p>{ profileData.githubusername? "Github username: " + profileData.githubusername: null}</p>
                <p className="profileWork">{capitalize(profileData.status)} , {capitalize(profileData.company)}</p>
                <p className="profileWorkLocation">
                  At, {capitalize(profileData.location)}
                </p>
                <ul>
                  <List data={profileData.social? profileData.social : null}/>
                </ul>
              </div>
            </div>
            <div className="websiteContainer">
            <h2 className="text-primary">PortFolio website:</h2>
            <p>
              {profileData.website?(<a href={profileData.website} style={{fontFamily:"monospace"}}>Click At your own risk</a>) 
              : null}
              </p>  
            </div>
            <div className="profileDetail">
              <div className="profileBio">
                <h2 className="text-primary">
                  {capitalize(profileData.user.name)}
                  <sup>'s</sup> Bios
                </h2>
                <p style={{  whiteSpace: 'pre-wrap'}}>

                {profileData.bio}
                </p>
              </div>
              <div className="skillSets ">
                <h2 className="text-primary">Skills</h2>
                <ul>{element}</ul>
              </div>
            </div>

            <div className="eduExpContainer">
              <div className="expsContainer">
                <div className="expContainer">
                  <h2 className="text-primary">Experience</h2>
                  {
                profileData.experience.map((i)=>{
                  return <Experience data={i} key={i.title}/>
                })
              }
                </div>
              </div>
              <div className="eduContainer">
              <h2 className="text-primary">Education</h2>
              {
                profileData.education.map((i)=>{
                  return <Education data={i} key={i.school}/>
                })
              }
              </div>
            </div>
            <div className="githubContainer">
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
            </div>
          </div>
        </div>
      ) : (
        <Loader/>
      )}
    </>
  );
};

export default Profile;
