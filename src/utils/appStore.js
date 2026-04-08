import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";

const appStore = configureStore({
  reducer: {
    user: user.reducer,
  },
});

export {appStore};