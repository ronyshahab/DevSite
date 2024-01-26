import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/CurrentUser.slice.js";
export const store = configureStore({
  reducer: { currentUser: currentUserReducer },
});
