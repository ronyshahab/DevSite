import React, { useEffect, useState } from "react";
import "./follow.css";
import getData from "../../../commonFunction/getDataFromAxios";
import { resetCurrentUser } from "../../../redux/slices/CurrentUser.slice";
import { useDispatch, useSelector } from "react-redux";
const Follow = ({ id }) => {
  const dispatch = useDispatch();
  const [doesFollow, setDoesFollow] = useState(false);

  const currentUser = useSelector((s) => s.currentUser);
  const followUser = async () => {
    try {
      if (id) {
        await getData(
          "put",
          `http://localhost:5000/api/user/${
            currentUser?.user?.followers.includes(id) ? "unfollow" : "follow"
          }/${id}`
        );
        dispatch(resetCurrentUser());
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setDoesFollow(currentUser?.user?.followers?.includes(id) ? true : false);
  }, [currentUser]);
  return (
    <>
      {currentUser.user?._id !== id && (
        <div>
          <button
            className="btn btn-primary"
            style={{ marginBottom: "1em" }}
            onClick={() => followUser()}
          >
            {doesFollow ? "Unfollow" : "Follow"}
          </button>
        </div>
      )}
    </>
  );
};

export default Follow;
