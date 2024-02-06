import React, { useEffect, useState } from "react";
import { capitalize } from "../../../commonFunction/commonFunction";
import { Link, useNavigate } from "react-router-dom";
import EducationTable from "./EducationTable";
import getData from "../../../commonFunction/getDataFromAxios";
import ExperienceTable from "./ExperienceTable";
import Loader from "../../smallerComponent/Loader";

const Dashboard = () => {
  const [educationData, setEducationData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("get", "/profile/me");
        setEducationData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = () => {
    navigate(-1);
  };

  const updatable = false;
  return (
    <div className="container">
      {educationData !== null ? (
        <div className="dashboardContainer ">
          <div>
            <button
              className="btn btn-primary"
              style={{ marginBottom: "1em" }}
              onClick={handleChange}
            >
              Go back
            </button>
            <h1 className="text-primary">Dashboard</h1>
            <p>
              {" "}
              <i className="fa-solid fa-user"></i> Welcome{" "}
              <span className="text-primary">
                {capitalize(educationData.user.name)}
              </span>
            </p>
            <div className="dashboardLinkContainer">
              <Link to={"/create-profile"} style={{ color: "white" }}>
                <button className="btnMain">
                  {" "}
                  <i className="fa-solid fa-id-card"></i>
                  Edit profile
                </button>
              </Link>

              <Link
                to={`/add-education/${updatable}`}
                style={{ color: "white" }}
              >
                <button className="btnMain">
                  {" "}
                  <i className="fa-sharp fa-solid fa-graduation-cap"></i>
                  Add Education
                </button>
              </Link>
              <Link
                to={`/add-experience/${updatable}`}
                style={{ color: "white" }}
              >
                <button className="btnMain">
                  {" "}
                  <i className="fa-solid fa-user-tie"></i>
                  Add Experience
                </button>
              </Link>
            </div>
          </div>
          <div className="tableContainer">
            {educationData.experience.length !== 0 && (
              <div className="experienceContainer">
                <h2 className="text-primary">Experience</h2>
                <div className="expTableContainer">
                  <ExperienceTable data={educationData.experience} />
                </div>
              </div>
            )}
            {educationData.education.length !== 0 && (
              <div className="experienceContainer" style={{ marginTop: "1em" }}>
                <h2 className="text-primary">Education</h2>
                <div className="expTableContainer">
                  <EducationTable data={educationData.education} />
                </div>
              </div>
            )}

            <div className="deleteAccountButtonContainer">

            <button className="btn btn-danger deleteAccountButton "   style={{ marginTop: "0.8em" }}>
              Delete my account
            </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Dashboard;
