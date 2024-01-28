import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { dateFormate } from "../../commonFunction/commonFunction";
import Input from "../smallerComponent/Input";
import getData from "../../commonFunction/getDataFromAxios";
import { Alert } from "../smallerComponent/Toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { experienceSchema } from "../../validation/Validation";
import { Form } from "react-bootstrap";
import { resetSelectedExprience, setSelectedExperience } from "../../redux/slices/SelectedExperience.slice";
import { resetCurrentUser } from "../../redux/slices/CurrentUser.slice";
const AddExperience = () => {
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch()
  const updatable = param.updatable === "true";
  const [experienceId, setExperienceId] = useState()

  const experienceFormData = useSelector((s) => s.selectedExperience);


  const addExperience = async (method, url, data) => {
    const result = await getData(method, url, data);
    navigate("/dashboard");
    return result;
  };


  useEffect(()=>{
    const experienceId = updatable
    ? experienceFormData[experienceFormData.length - 1]
    : undefined;

    setExperienceId(experienceId)
    if(experienceId){
    
      formik.setValues({
        title:  experienceFormData[0],
      company: experienceFormData[1] ,
      location: experienceFormData[2],
      from: dateFormate(experienceFormData[3]),
      to: dateFormate(experienceFormData[4]) ,
      current:  experienceFormData[5],
      description: experienceFormData[6] 
      })
    }
    return () =>{
      if(experienceFormData.length > 0){

        localStorage.setItem("lastSelectedExperience", experienceFormData)
      }
    }

    
  },[experienceFormData])

  useEffect(()=>{
    if(experienceFormData[0] === undefined){
      const lastSelectedExperience = localStorage.getItem("lastSelectedExperience")
     
      if(lastSelectedExperience){
        const lastSelectedArray = lastSelectedExperience.split(",")
        lastSelectedArray[5] = lastSelectedArray[5] == "true" ? true : false
    dispatch(setSelectedExperience(lastSelectedArray))
      }
    }
    
  },[])

  const formik = useFormik({
    initialValues: {
      title: "",
      company:  "",
      location:  "",
      from:   "",
      to:  "",
      current:   false,
    },

    validationSchema: experienceSchema,
    onSubmit: async (initialValues) => {
      if (experienceId !== undefined && experienceId !== null) {
        const res = await addExperience(
          "put",
          `/profile/experience/${experienceId}`,
          initialValues
        );
        res && Alert("success", "Experience Edited Successfully", 2000);
        if(res.status == 200){
          dispatch(resetCurrentUser())
        }
      } else {
        const res = await addExperience(
          "put",
          `/profile/experience`,
          initialValues
        );
        res && Alert("success", "Experience Added Successfully", 2000);
        if(res.status == 200){
          dispatch(resetCurrentUser())
        }
      }
    },
  });

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">{updatable? 'Edit' : 'Add'} An Experience</h1>
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
              isInvalid={formik.touched.title && formik.errors.title}
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
              isInvalid={formik.touched.company && formik.errors.company}
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
              isInvalid={formik.touched.location && formik.errors.location}
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
              isInvalid={formik.touched.from && formik.errors.from}
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
              isInvalid={formik.touched.to && formik.errors.to}
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
              isInvalid={formik.touched.current && formik.errors.current}
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
              isInvalid={formik.touched.description && formik.errors.description}
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
