import React, { useEffect, useState } from "react";
import Input from "../smallerComponent/Input";
import { useFormik } from "formik";
import getData from "../../commonFunction/getDataFromAxios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurretnUserProfileDataAction } from "../../redux/actions/actions";
import { Form } from "react-bootstrap";
import SelectComponent from "../smallerComponent/SelectComponent";
import axios from "axios";
import { createProileSchema } from "../../validation/Validation";

const CreateProfile = () => {
  // useHooksInstance
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState([]);

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

    validationSchema: createProileSchema,
    onSubmit: async (initialValues) => {
      const payload = {
        ...initialValues,
        skills: initialValues.skills.filter((m) => m !== ""),
        status: initialValues.status.value,
      };
      console.log(payload);
      await editProfile("post", "/profile", payload);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("get", "/profile/me");
        setProfileData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    formik.setValues({
      company: profileData.company ? profileData.company : "",
      website: profileData.website ? profileData.website : "",
      location: profileData.location ? profileData.location : "",
      status: profileData.status
        ? { value: profileData.status, label: profileData.status }
        : { value: "", label: "" },
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
    });
    console.log(formik.values);
  }, [profileData]);

  const addInput = (e) => {
    e.preventDefault();
    console.log(formik.values.skills[formik.values.skills.length - 1]);
    if (formik.values.skills[formik.values.skills.length - 1]) {
      const newSkills = [...formik.values.skills, ""];
      formik.setFieldValue("skills", newSkills);
    }
  };

  return (
    <div>
      <section className="container">
        {/* checking for the data is avaialable or not */}

        {profileData && Object.keys(profileData).length !== 0 && (
          <>
            <h1 className="large text-primary">Create Your Profile</h1>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Label htmlFor="status">
                Select Professional Status
              </Form.Label>
              <SelectComponent
                name="status"
                values={formik.values.status}
                onChange={(e) => formik.setFieldValue("status", e)}
                onBlur={formik.handleBlur}
                className={"mb-3"}
                data={[
                  { value: "Developer", label: "Developer" },
                  { value: "Junior Developer", label: "Junior Developer" },
                  { value: "Senior Developer", label: "Senior Developer" },
                  { value: "Manager", label: "Manager" },
                  {
                    value: "Student or Learning",
                    label: "Student or Learning",
                  },
                  { value: "Instructor", label: "Instructor" },
                  { value: "Intern", label: "Intern" },
                  { value: "Other", label: "Other" },
                ]}
              />
              <Form.Group className="mb-3" controlId="formCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  placeholder="Company"
                  name="company"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik?.errors?.company && formik.touched.company}
                />
                {formik.touched.company && formik.errors.company && (
                  <Form.Control.Feedback type="invalid">
                    <small style={{ color: "red" }}>
                      *{formik.errors.company}
                    </small>
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik?.errors?.location && formik.touched.location
                  }
                />
                {formik.touched.location && formik.errors.location && (
                  <Form.Control.Feedback type="invalid">
                    <small style={{ color: "red" }}>
                      *{formik.errors.location}
                    </small>
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Website"
                  name="website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik?.errors?.website && formik.touched.website}
                />
                {formik.touched.website && formik.errors.website && (
                  <Form.Control.Feedback type="invalid">
                    <small style={{ color: "red" }}>
                      *{formik.errors.website}
                    </small>
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Skills</Form.Label>
                {formik.values.skills.map((item, index) => {
                  return (
                    <div key={index}>
                      <Form.Control
                        type="text"
                        placeholder="Skills"
                        name={`skills[${index}]`}
                        value={formik.values.skills[index]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik?.errors?.skills && formik.touched.skills
                        }
                      />
                      {formik.touched.skills && formik.errors.skills && (
                        <Form.Control.Feedback type="invalid">
                          <small style={{ color: "red" }}>
                            *{formik.errors.skills}
                          </small>
                        </Form.Control.Feedback>
                      )}
                    </div>
                  );
                })}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(event) => addInput(event)}
                  disabled={
                    !formik.values.skills[formik.values.skills.length - 1]
                  }
                >
                  Add
                </button>
              </Form.Group>
              {/* <div className="form-group">
                <Input
                  title={"Github:"}
                  type="text"
                  placeholder="Github Username"
                  name="githubusername"
                  value={formik.values.githubusername}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div> */}
              <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as={"textarea"}
                  placeholder="Bio"
                  name="bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik?.errors?.bio && formik.touched.bio}
                />
                {formik.touched.bio && formik.errors.bio && (
                  <Form.Control.Feedback type="invalid">
                    <small style={{ color: "red" }}>*{formik.errors.bio}</small>
                  </Form.Control.Feedback>
                )}
              </Form.Group>
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
            </Form>{" "}
          </>
        )}
      </section>
    </div>
  );
};

export default CreateProfile;
