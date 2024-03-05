import React from "react";
import "./suggestion.css";
import { useNavigate } from "react-router-dom";

const Suggestion = ({ data , setData}) => {
     const navigate = useNavigate()

  return (
    <div className={`${ data && data.length > 0 ? "searchedUserContainer" : "hideSearchedUserContainer" }`}>
      {data  &&
        data.map((element) => {
          return (
            <div className="searchedUser" onClick={() => { setData(null); navigate(`/profile/${element.id}`)}}>
                <img className="icon-large" src={element.avatar} />
                <span>{element.name}</span>
            </div>
          );
        })}
    </div>
  );
};

export default Suggestion;
