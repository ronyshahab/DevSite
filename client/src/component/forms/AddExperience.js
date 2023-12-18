import React from "react";
import { useFormik } from "formik";
import { dateFormate } from "../../commonFunction/commonFunction";
import Input from "../smallerComponent/Input";
import getData from "../../commonFunction/getDataFromAxios";
import { Alert } from "../smallerComponent/Toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { experienceSchema } from "../../validation/Validation";
import { Form } from "react-bootstrap";
const AddExperience = () => {
  const navigate = useNavigate();
  const param = useParams();
  const updatable = param.updatable === "true";

  const educationFormData = useSelector((s) => s.setEducationFormDataReducer);
  const educationId = updatable
    ? educationFormData.current[educationFormData.current.length - 1]
    : undefined;

  const addExperience = async (method, url, data) => {
    const result = await getData(method, url, data);
    navigate("/dashboard");
    return result;
  };

  const formik = useFormik({
    initialValues: {
      title: updatable ? educationFormData.current[0] : "",
      company: updatable ? educationFormData.current[1] : "",
      location: updatable ? educationFormData.current[2] : "",
      from: updatable ? dateFormate(educationFormData.current[3]) : "",
      to: updatable ? dateFormate(educationFormData.current[4]) : "",
      current: updatable ? educationFormData.current[5] : false,
      description: updatable ? educationFormData.current[6] : "",
    },

    validationSchema: experienceSchema,
    onSubmit: async (initialValues) => {
      if (educationId !== undefined && educationId !== null) {
        const res = await addExperience(
          "put",
          `/profile/experience/${educationId}`,
          initialValues
        );
        res && Alert("success", "Experience Edited Successfully", 2000);
      } else {
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
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              placeholder="Job Title"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              error={formik.touched.title && formik.errors.title}
            />
            {formik.touched.title && formik.errors.title && (
              <Form.Control.Feedback type="invalid">
                <small style={{ color: "red" }}>*{formik.errors.title}</small>
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Company</Form.Label>
            <Form.Control
              placeholder="Company"
              name="company"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.company}
              error={formik.touched.company && formik.errors.company}
            />
            {formik.touched.company && formik.errors.company && (
              <Form.Control.Feedback type="invalid">
                <small style={{ color: "red" }}>*{formik.errors.company}</small>
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              placeholder="Location"
              name="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              error={formik.touched.location && formik.errors.location}
            />
            {formik.touched.location && formik.errors.location && (
              <Form.Control.Feedback type="invalid">
                <small style={{ color: "red" }}>
                  *{formik.errors.location}
                </small>
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Form</Form.Label>
            <Input
              type="date"
              name="from"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.from}
              error={formik.touched.from && formik.errors.from}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>To</Form.Label>
            <Input
              type="date"
              name="to"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.to}
              error={formik.touched.to && formik.errors.to}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Input
              inputType="checkbox"
              title="Current Working?"
              name="current"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.current}
              error={formik.touched.current && formik.errors.current}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              placeholder="Job Description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              error={formik.touched.description && formik.errors.description}
            />
            {formik.touched.location && formik.errors.location && (
              <Form.Control.Feedback type="invalid">
                <small style={{ color: "red" }}>
                  *{formik.errors.location}
                </small>
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn my-1" to={"/dashboard"}>
            Go Back
          </Link>
        </Form>
      </section>
    </div>
  );
};

export default AddExperience;
