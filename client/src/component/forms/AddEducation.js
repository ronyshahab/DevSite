import React from "react";
import { useFormik } from "formik";
import { dateFormate } from "../../commonFunction/commonFunction";
import { Link, useNavigate, useParams } from "react-router-dom";
import getData from "../../commonFunction/getDataFromAxios";
import { useSelector } from "react-redux";
import { Alert } from "../smallerComponent/Toast";
import Input from "../smallerComponent/Input";
import { educationSchema } from "../../validation/Validation";
import { Form } from "react-bootstrap";
import DatePickerComponent from "../smallerComponent/DateComponent";

const AddEducation = () => {
  const navigate = useNavigate();
  const param = useParams();
  const updatable = param.updatable === "true";

  const educationFormData = useSelector((s) => s.setEducationFormDataReducer);
  // console.log(educationFormData)

  const educationId = updatable
    ? educationFormData.current[educationFormData.current.length - 1]
    : undefined;

  // Add education Api call
  const addEducation = async (method, url, data) => {
    const result = await getData(method, url, data);
    navigate("/dashboard");
    return result;
  };

  // formik created
  const formik = useFormik({
    initialValues: {
      school: updatable ? educationFormData.current[0] : "",
      degree: updatable ? educationFormData.current[1] : "",
      fieldofstudy: updatable ? educationFormData.current[2] : "",
      from: updatable ? dateFormate(educationFormData.current[3]) : "",
      to: updatable ? dateFormate(educationFormData.current[4]) : "",
      description: updatable ? educationFormData.current[5] : "",
    },
    validationSchema: educationSchema,
    onSubmit: async (initialValues) => {
      if (educationId !== undefined && educationId !== null) {
        const res = await addEducation(
          "put",
          `/profile/education/${educationId}`,
          initialValues
        );
        res && Alert("success", "Education edited successfully", 2000);
      } else {
        const res = await addEducation(
          "put",
          `/profile/education`,
          initialValues
        );
        res && Alert("success", "Education added successfully", 2000);
      }
    },
  });

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Add Your Education</h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"></i> Add any school, bootcamp,
          etc that you have attended
        </p>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>School</Form.Label>
            <Form.Control
              type="text"
              name="school"
              placeholder="Institue Name"
              value={formik.values.school}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik?.errors?.school && formik.touched.school}
              error={formik.touched.school && formik.errors.school}
            />
            {formik.touched.school && formik.errors.school && (
              <Form.Control.Feedback type="invalid">
                <small style={{ color: "red" }}>*{formik.errors.school}</small>
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Degree</Form.Label>
            <Form.Control
              type="text"
              name="degree"
              placeholder="Degree Completed"
              value={formik.values.degree}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik?.errors?.degree && formik.touched.degree}
              error={formik.touched.degree && formik.errors.degree}
            />
            {formik.touched.degree && formik.errors.degree && (
              <Form.Control.Feedback type="invalid">
                <small style={{ color: "red" }}>*{formik.errors.degree}</small>
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Field</Form.Label>
            <Form.Control
              type="text"
              name="fieldofstudy"
              placeholder="Field of Study"
              value={formik.values.fieldofstudy}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik?.errors?.fieldofstudy && formik.touched.fieldofstudy
              }
              error={formik.touched.fieldofstudy && formik.errors.fieldofstudy}
            />
            {formik.touched.fieldofstudy && formik.errors.fieldofstudy && (
              <Form.Control.Feedback type="invalid">
                <small style={{ color: "red" }}>
                  *{formik.errors.fieldofstudy}
                </small>
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>From</Form.Label>
            <Input
              name="from"
              type="date"
              value={formik.values.from}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik?.errors?.from && formik.touched.from}
              error={formik.touched.from && formik.errors.from}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>To</Form.Label>
            <Input
              type="date"
              name="to"
              value={formik.values.to}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik?.errors?.to && formik.touched.to}
              error={formik.touched.to && formik.errors.to}
            />
          </Form.Group>

          <Form.Group className="mt-3 mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Tell us about your academic experience"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik?.errors?.description && formik.touched.description
              }
              error={formik.touched.description && formik.errors.description}
            />
            {formik.touched.description && formik.errors.description && (
              <Form.Control.Feedback type="invalid">
                <small style={{ color: "red" }}>
                  *{formik.errors.description}
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

export default AddEducation;
