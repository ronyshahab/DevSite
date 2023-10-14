import {

  SET_CURRENT_EDUCATION_FORM_DATA,
  SET_CURRENT_USER_PROFILE_DATA,
} from "../types/types";
import getData from "../../commonFunction/getDataFromAxios";

// set education action to set the current form data in redux
export const setEducationFormData = (data) => {
  return {
    type: SET_CURRENT_EDUCATION_FORM_DATA,
    payload: {
      dataArray: data,
    },
  };
};

// set current user profile data to set the data of current user in redux
export const setCurretnUserProfileDataAction = () => {
  
  // using thunk middleware to call api
  return async (dispatch) => {
    try {
      const data = await getData("get", "profile/me");
      dispatch({
        type: SET_CURRENT_USER_PROFILE_DATA,
        payload: {
          data: data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
