import { createSlice } from "@reduxjs/toolkit";

const request = createSlice({
  name: "request",
  initialState: null,
    reducers: {
    setRequest: (state, action) => {
      return action.payload;    
    },
    clearRequest: (state,action) => {
      const newArray = state.data.filter((req) => req._id !== action.payload);
      return {data: newArray};
    } 
}
});

export const { setRequest, clearRequest } = request.actions;
export default request;