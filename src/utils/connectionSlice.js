import { createSlice } from "@reduxjs/toolkit";

const connection = createSlice({
  name: "connection",
  initialState: null,
    reducers: {
    setConnection: (state, action) => {
      return action.payload;    
    },
    clearConnection: (state, action) => {
      
      return [];
    } 
}
});

export const { setConnection, clearConnection } = connection.actions;
export default connection;