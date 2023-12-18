import React from "react";
import Actions from "./Actions";

const TableBody = ({ data, getUserData, updateUser }) => {
  // const value = Object.values(data[0])
  // console.log(value)
  return (
    <>
      {data.map((item, index) => {
        return (
          <tr key={index}>
            {/* {console.log(item)} */}
            {item.map((itemText, itemIndex) => {
              return <td key={itemIndex}>{itemText}</td>;
            })}
            <td>
              <Actions
                data={item}
                getUserData={getUserData}
                updateUser={updateUser}
              />
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default TableBody;
