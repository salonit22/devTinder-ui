import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: null,
    reducers: {
    setUser: (state, action) => {
      return action.payload;    
    },
    clearUser: () => {
      return {};
    } 
}
});

export const { setUser, clearUser } = user.actions;
export default user;