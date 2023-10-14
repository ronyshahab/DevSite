import {  setEducationFormDataReducer,setCurrentUserProfileDataReducer } from "./reducers/reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ setEducationFormDataReducer, setCurrentUserProfileDataReducer})