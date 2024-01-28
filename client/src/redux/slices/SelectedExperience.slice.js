import { createSlice } from "@reduxjs/toolkit";
const selectedExperience = {};

export const currentExperienceSlice = createSlice({
  name: "experience",
  initialState: selectedExperience,
  reducers: {
    setSelectedExperience: (state, action) => {
      return action.payload;
    },
    resetSelectedExprience: (state) => {
      return {};
    },
  },
});

export const { setSelectedExperience, resetSelectedExprience } =
  currentExperienceSlice.actions;

export default currentExperienceSlice.reducer;
