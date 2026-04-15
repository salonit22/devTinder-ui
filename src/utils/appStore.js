import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import feed from "./feedSlice";
import connection from "./connectionSlice";
import request from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: user.reducer,
    feed: feed.reducer,
    connection: connection.reducer,
    request: request.reducer
  },
});

export {appStore};