import { combineReducers } from "redux";
import auth from "./auth";
import hospital from "./hospital";
import map from "./map";

const rootReducer = combineReducers({ auth, hospital, map });

export default rootReducer;
