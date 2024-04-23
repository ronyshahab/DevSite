import React from "react";
import { capitalize } from "../../../commonFunction/commonFunction";
const TableHeader = ({ data }) => {
  let header = Object.keys(data[0]);
  header.pop();
  header = [...header, "actions"];
  return (
    <>
      {
        <tr key="">
          {header.map((item, index) => {
            return <th key={index}>{capitalize(item)}</th>;
          })}
        </tr>
      }
    </>
  );
};

export default TableHeader;
