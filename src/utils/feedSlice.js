import {createSlice} from '@reduxjs/toolkit'

const feed = createSlice({
    name : "feed",
    initialState : null,
    reducers : {
        addUser:(state, action) =>{
            return action.payload;  
        },
        removeUser:(state, action) =>{
            const newFeed = state.filter(user => user._id !== action.payload)
            return newFeed;
        }
    }

})
export const {addUser,removeUser} = feed.actions;
export default feed