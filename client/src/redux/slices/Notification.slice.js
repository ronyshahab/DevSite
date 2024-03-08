import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
  name: "newMsg",
  initialState: [],
  reducers: {
    pushNotification: (state, action) => {
      state.push(action.payload);
    },

    popNotification: (state, action) => {
      return state.filter((element) => element !== action.payload);
    },
  },
});
export const { pushNotification, popNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;
