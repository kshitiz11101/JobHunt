import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './userSlice.js';
import jobsReducer from './jobSlice.js'
const rootReducer = combineReducers({
    userDetail: userReducer,
    jobs:jobsReducer,

});

export default rootReducer;