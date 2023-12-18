import React from "react";
import {
  dateFormate,
  capitalize,
} from "../../../commonFunction/commonFunction";

const Experience = ({ data }) => {
  const fromDate = dateFormate(data.from);
  const uptoDate = dateFormate(data.to);
  // console.log(data);
  return (
    <div
      style={{ margin: "1em 0" }}
      className="profileEducationDisplayContainer"
    >
      <h2 className="institute">
        {" "}
        <b> {capitalize(data.company)} </b>{" "}
      </h2>
      <p className="time">
        {" "}
        <b> Duration: </b> {fromDate} to {uptoDate}
      </p>
      <p className="title">
        {" "}
        <b>Position: </b> {capitalize(data.title)}
      </p>
      {data.location && (
        <p className="location">
          <b>Location: </b> {capitalize(data.location)}
        </p>
      )}
      <p className="current">
        <b>Currently working? </b> {data.current ? "Yes" : "No"}
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

export default Experience;
