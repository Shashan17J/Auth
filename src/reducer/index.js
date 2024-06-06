import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";

// create rootReducer(combination of all reducers)
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
