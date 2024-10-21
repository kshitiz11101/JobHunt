import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './userSlice.js';

const rootReducer = combineReducers({
    userDetail: userReducer
});

export default rootReducer;