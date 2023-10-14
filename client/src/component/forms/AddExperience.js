import React from "react";
import { useFormik } from "formik";
import { dateFormate } from "../../commonFunction/commonFunction";
import Input from "../smallerComponent/Input";
import getData from "../../commonFunction/getDataFromAxios";
import { Alert } from "../smallerComponent/Toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { experienceSchema } from "../../validation/Validation";
const AddExperience = () => {
  // hooks instance created
  const navigate = useNavigate();
  const param = useParams();
  const updatable = param.updatable === "true";

  // data called from redux
  const educationFormData = useSelector((s) => s.setEducationFormDataReducer);
  console.log(educationFormData)
  // creating education id
  const educationId = updatable
    ? educationFormData.current[educationFormData.current.length - 1]
    : undefined;

  // function created to call axios
  const addExperience = async (method, url, data) => {
    const result = await getData(method, url, data);
    navigate("/dashboard");
    return result;
  };

  // formik instance created
  const formik = useFormik({
    // values set in formik

    initialValues: {
      title: updatable ? educationFormData.current[0] : "",
      company: updatable ? educationFormData.current[1] : "",
      location: updatable ? educationFormData.current[2] : "",
      from: updatable ? dateFormate(educationFormData.current[3]) : "",
      to: updatable ? dateFormate(educationFormData.current[4]) : "",
      current: updatable ? educationFormData.current[5] : false,
      description: updatable ? educationFormData.current[6] : "",
    },

    // on submit function for form
    validationSchema: experienceSchema,
    onSubmit: async (initialValues) => {
      // condition to check availablity of education Id

      if (educationId !== undefined && educationId !== null) {
        // console.log("This will update", educationId);

        // updating data in api
        const res = await addExperience(
          "put",
          `/profile/experience/${educationId}`,
          initialValues
        );
        res && Alert("success", "Experience Edited Successfully", 2000);
      } else {
        // console.log("This will add", educationId);

        // adding data in api
        const res = await addExperience(
          "put",
          `/profile/experience`,
          initialValues
        );
        res && Alert("success", "Experience Added Successfully", 2000);
      }
    },
  });

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Add An Experience</h1>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <Input
              title="Position:"
              type="text"
              placeholder="Job Title"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              error={formik.touched.title && formik.errors.title}
            />
          </div>
          <div className="form-group">
            <Input
              title="Company:"
              placeholder="Company"
              name="company"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.company}
              error={formik.touched.company && formik.errors.company}
            />
          </div>
          <div className="form-group">
            <Input
              title="Location:"
              placeholder="Location"
              name="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              error={formik.touched.location && formik.errors.location}
            />
          </div>
          <div className="form-group">
            <Input
              title="Form:"
              type="date"
              name="from"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.from}
              error={formik.touched.from && formik.errors.from}
            />
          </div>
          <div className="form-group">
            <Input
              title="To:"
              type="date"
              name="to"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.to}
              error={formik.touched.to && formik.errors.to}
            />
          </div>
          <div className="form-group">
            <Input
              inputType="checkbox"
              title="Current Working?"
              name="current"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.current}
              error={formik.touched.current && formik.errors.current}
            />
          </div>
          <div className="form-group">
            <Input
              title="Description:"
              name="description"
              inputType="textarea"
              placeholder="Job Description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              error={formik.touched.description && formik.errors.description}
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn my-1" to={"/dashboard"}>
            Go Back
          </Link>
        </form>
      </section>
    </div>
  );
};

export default AddExperience;
