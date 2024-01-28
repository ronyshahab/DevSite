import { createSlice } from "@reduxjs/toolkit";
const selectedEducation = {};

export const currentEducation = createSlice({
  name: "education",
  initialState: selectedEducation,
  reducers: {
    setSelectedEducation: (state, action) => {
      return action.payload;
    },
    resetSelectedEducation: (state) => {
      return {};
    },
  },
});

export const { setSelectedEducation, resetSelectedEducation } =
  currentEducation.actions;

export default currentEducation.reducer;
