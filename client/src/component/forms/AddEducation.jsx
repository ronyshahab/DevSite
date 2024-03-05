import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { dateFormate } from "../../commonFunction/commonFunction";
import { Link, useNavigate, useParams } from "react-router-dom";
import getData from "../../commonFunction/getDataFromAxios";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "../smallerComponent/Toast";
import Input from "../smallerComponent/Input";
import { educationSchema } from "../../validation/Validation";
import { Form } from "react-bootstrap";
import {
  setSelectedEducation,
} from "../../redux/slices/SelectedEducation.slice";
import { resetCurrentUser } from "../../redux/slices/CurrentUser.slice";

const AddEducation = () => {
  const navigate = useNavigate();
  const param = useParams();
  const updatable = param.updatable === "true";
  const dispatch = useDispatch();
  const [educationId, setEducationId] = useState();

  const educationFormData = useSelector((s) => s.selectedEducation);


  const addEducation = async (method, url, data) => {
    const result = await getData(method, url, data);
    navigate("/dashboard");
    return result;
  };

  useEffect(() => {
    const educationId = updatable
      ? educationFormData[educationFormData.length - 1]
      : undefined;

    setEducationId(educationId);
    if (educationId) {
      formik.setValues({
        school: educationFormData[0],
        degree: educationFormData[1],
        fieldofstudy: educationFormData[2],
        from: dateFormate(educationFormData[3]),
        to: dateFormate(educationFormData[4]),
        description: educationFormData[5],
      });
    }
    return () => {
      if (educationFormData.length > 0) {
        localStorage.setItem("lastSelectedEducation", educationFormData);
      }
    };
  
  }, [educationFormData]);

  useEffect(() => {
    if (educationFormData[0] === undefined) {
      const lastSelectedEducation = localStorage.getItem(
        "lastSelectedEducation"
      );

      if (lastSelectedEducation) {
        const lastSelectedArray = lastSelectedEducation.split(",");
        lastSelectedArray[5] = lastSelectedArray[5] == "true" ? true : false;
        dispatch(setSelectedEducation(lastSelectedArray));
      }
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      description: "",
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
        if (res.status == 200) {
          dispatch(resetCurrentUser());
        }
      } else {
        const res = await addEducation(
          "put",
          `/profile/education`,
          initialValues
        );
        res && Alert("success", "Education added successfully", 2000);
        if (res.status == 200) {
          dispatch(resetCurrentUser());
        }
      }
    },
  });

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">
          {updatable ? "Edit" : "Add"} Your Education
        </h1>
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
