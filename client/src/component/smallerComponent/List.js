import React from "react";

const List = ({ data }) => {
  const generateList = (object) => {
    const listArray = [];
    for (const key in object) {
      listArray.push(
        <li key={object[key]}>
          <a href={object[key]}>
            <i className={`fa-brands fa-${key}`}></i>
          </a>
        </li>
      );
    }
    return listArray;
  };

  return <div>{data !== null && <ul>{generateList(data)}</ul>}</div>;
};

export default List;
