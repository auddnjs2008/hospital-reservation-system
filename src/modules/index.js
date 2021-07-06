import { combineReducers } from "redux";
import auth from "./auth";
import hospital from "./hospital";

const rootReducer = combineReducers({ auth, hospital });

export default rootReducer;
