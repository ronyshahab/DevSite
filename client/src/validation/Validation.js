import * as YUP from "yup";

export const educationSchema = YUP.object({
  school: YUP.string().required("This field is required"),
  degree: YUP.string().required("This field is required"),
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
