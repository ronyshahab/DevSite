import React from "react";
import { capitalize } from "../../../commonFunction/commonFunction";
import { dateFormate } from "../../../commonFunction/commonFunction";
const Education = ({ data }) => {
  const fromDate = dateFormate(data.from);
  const uptoDate = dateFormate(data.to);

  return (
    <div
      style={{ margin: "1em 0" }}
      className="profileEducationDisplayContainer"
    >
      <h2 className="institute">
        {" "}
        <b> {capitalize(data.school)} </b>{" "}
      </h2>
      <p className="time">
        {" "}
        <b> Duration: </b> {fromDate} to {uptoDate}
      </p>
      <p className="degree">
        {" "}
        <b>Degree: </b> {capitalize(data.degree)}
      </p>
      <p className="field">
        {" "}
        <b>Field of Study: </b> {capitalize(data.fieldofstudy)}
      </p>
      <p className="description">
        {data.description ? (
          <>
            {" "}
            <b>Description: </b>{" "}
            <span style={{ whiteSpace: "pre-wrap" }}>{data.description} </span>{" "}
          </>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default Education;
