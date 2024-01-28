import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/CurrentUser.slice.js";
import currentExperienceReducer from "./slices/SelectedExperience.slice.js";
import currenEducationReducer from "./slices/SelectedEducation.slice.js";
export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    selectedExperience: currentExperienceReducer,
    selectedEducation: currenEducationReducer,
  },
});
