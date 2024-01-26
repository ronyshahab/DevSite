import { createSlice } from "@reduxjs/toolkit";
const currentUser = {};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: currentUser,
  reducers: {
    setCurrentUser: (state, action) => {
      return action.payload;
    },
    resetCurrentUser: (state) => {
      return {};
    },
  },
});

export const { setCurrentUser, resetCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
