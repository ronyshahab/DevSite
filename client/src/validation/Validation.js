import * as YUP from "yup";

export const educationSchema = YUP.object({
  school: YUP.string().required("This field is required"),
  degree: YUP.string().required("This field is required"),
  description: YUP.string().required("This field is required"),
  fieldofstudy: YUP.string().required("This field is required"),

  from: YUP.date()
    .typeError("Enter in date formate(yyyy-mm-dd)")
    .required("This field is required")
    .test("from", "Invalid Date", (value) => {
      const date = new Date();
      if (value > date) {
        return false;
      }
      return true;
    }),
  to: YUP.date()
    .typeError("Enter in date formate(yyyy-mm-dd)")
    .required("This field is required")
    .test((value, { parent }) => {
      const fromDate = parent.from;
      return value > fromDate;
    }),

  fieldofstudy: YUP.string().required("This field is required"),
});

export const experienceSchema = YUP.object({
  title: YUP.string().required("This field is required"),
  company: YUP.string().required("This field is required"),
  location: YUP.string().required("This field is required"),
  from: YUP.date()
    .typeError("Enter in date formate(yyyy-mm-dd)")
    .required("This field is required")
    .test("from", "Invalid Date", (value) => {
      const date = new Date();
      if (value > date) {
        return false;
      }
      return true;
    }),
  to: YUP.date()
    .typeError("Enter in date formate(yyyy-mm-dd)")
    .required("This field is required")
    .test((value, { parent }) => {
      const fromDate = parent.from;
      return value > fromDate;
    }),
});

export const loginSchema = YUP.object({
  email: YUP.string()
    .required("This field is required")
    .test((value) => {
      if (value.includes("@")) {
        return true;
      }
    }),
  password: YUP.string()
    .required("This field is required")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password too weak")
    .test((value) => {
      if (value.length > 8) {
        return true;
      } else {
        return false;
      }
    }),
});

export const createProileSchema = YUP.object({
  company: YUP.string().required().max("50"),
  skills: YUP.string().required(),
  status: YUP.string().required(),
  bio: YUP.string().required(),
  location: YUP.string().required().max("150"),
});
