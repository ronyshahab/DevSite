import React, { useEffect } from "react";
import Input from "../smallerComponent/Input";
import { useFormik } from "formik";
import getData from "../../commonFunction/getDataFromAxios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurretnUserProfileDataAction } from "../../redux/actions/actions";

const CreateProfile = () => {

  
  // useHooksInstance
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  // Function to edit profile Data
  const editProfile = async (method, url, data) => {
    const result = await getData(method, url, data);
    navigate("/dashboard");
    return result;
  };

  // useEffect to call dispatch
    // useEffect(()=>{
    //   dispatch(setCurretnUserProfileDataAction())
    // },[])

  // gettitng data from redux
    const profileData = useSelector((s) => s.setCurrentUserProfileDataReducer);
    console.log(profileData)
  // formik instance created
    const formik = useFormik({
    initialValues: {
      company: profileData.company ? profileData.company : "",
      website: profileData.website ? profileData.website : "",
      location: profileData.location ? profileData.location : "",
      status: profileData.status ? profileData.status : "",
      skills: profileData.skills ? profileData.skills : [""],
      years: profileData.years ? profileData.years : "",
      githubusername: profileData.githubusername
        ? profileData.githubusername
        : "",
      bio: profileData.bio ? profileData.bio : "",
      youtube: profileData?.social?.youtube ?? "",
      twitter: profileData?.social?.twitter ?? "",
      facebook: profileData?.social?.facebook ?? "",
      linkedin: profileData?.social?.linkedin ?? "",
      instagram: profileData?.social?.instagram ?? "",
    },
    
    // submit function for the form
    onSubmit: async (initialValues) => {
      console.log(initialValues);
      await editProfile("post", "/profile", initialValues);
    },
  });

  // function to add skill input field 

  const addInput = (e) => {
    e.preventDefault();
    const newSkills = [...formik.values.skills, ""];
    formik.setFieldValue("skills", newSkills);
  };

  return (
    <div>
      <section className="container">

        {/* checking for the data is avaialable or not */}

        { profileData && Object.keys(profileData).length !== 0 && ( <>
        <h1 className="large text-primary">Create Your Profile</h1>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <Input
              inputType="dropdown"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={[
                "Select Professional Status",
                "Developer",
                "Junior Developer",
                "Senior Developer",
                "Manager",
                "Student or Learning",
                "Instructor",
                "Intern",
                "Other",
              ]}
            />
          </div>
          <div className="form-group">
            <Input
              title="Company:"
              placeholder="Company"
              name="company"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="form-group">
            <Input
              title={"Website:"}
              type="text"
              placeholder="Website"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="form-group">
            <Input
              title={"Location:"}
              type="text"
              placeholder="Location"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="form-group">
            <h2 className="text-Primary">Skills:</h2>
            {formik.values.skills.map((item, index) => {
              return (
                <Input
                  key={index}
                  type="text"
                  placeholder="* Skills"
                  name={`skills[${index}]`}
                  value={item}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              );
            })}
            <button
              type="button"
              className="btn btn-primary"
              onClick={(event) => addInput(event)}
            >
              Add
            </button>
          </div>
          <div className="form-group">
            <Input
              title={"Experience:"}
              type="number"
              placeholder="Years of Experience"
              name="years"
              value={formik.values.years}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="form-group">
            <Input
              title={"Github:"}
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={formik.values.githubusername}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="form-group">
            <Input
              inputType="textarea"
              placeholder="A short bio of yourself"
              name="bio"
              title={"Bio:"}
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></Input>
          </div>
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <Input
              type="text"
              placeholder="Twitter URL"
              name="twitter"
              value={formik.values.twitter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <Input
              type="text"
              placeholder="Facebook URL"
              name="facebook"
              value={formik.values.facebook}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <Input
              type="text"
              placeholder="YouTube URL"
              name="youtube"
              value={formik.values.youtube}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <Input
              type="text"
              placeholder="Linkedin URL"
              name="linkedin"
              value={formik.values.linkedin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <Input
              type="text"
              placeholder="Instagram URL"
              name="instagram"
              value={formik.values.instagram}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <a className="btn btn-light my-1" href="dashboard">
            Go Back
          </a>
        </form> </>)}
      </section>
    </div>
  );
};

export default CreateProfile;
