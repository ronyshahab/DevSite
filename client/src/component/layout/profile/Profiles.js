import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getData from "../../../commonFunction/getDataFromAxios";
import Loader from "../../smallerComponent/Loader";

const Profiles = () => {
  const [profilesData, setProfilesData] = useState(null);
  const fetchData = async () => {
    const data = await getData("get", "/profile");
    setProfilesData(data.data);
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {profilesData ? (
        <section className="container">
          <h1 className="text-primary">DevConnector</h1>
          Browse and connect with people
          {profilesData.map((profileData) => (
            <div className="cardContainer">
              <div className="card">
                <div className="imgContainer roundImg">
                  <img
                    src={`${profileData?.user?.avatar}`}
                    className="round-img profileImg"
                  ></img>
                </div>
                <div className="profileInfo">
                  <h1> {profileData?.user?.name}</h1>
                  <p id="currentWork">{profileData?.bio}</p>
                  <p className=" btn">
                    {" "}
                    <Link to={"/profile"}>My Profile</Link>{" "}
                  </p>
                </div>
                <div className="profileSkill">
                  <ul>
                    {profileData?.skills.map((skill) => (
                      <li style={{ listStyle: "none" }}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Profiles;
