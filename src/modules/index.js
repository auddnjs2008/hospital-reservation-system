import { combineReducers } from "redux";
import auth from "./auth";
import hospital from "./hospital";
import map from "./map";
import loading from "./loading";
import menupage from "./menupage";
const rootReducer = combineReducers({ auth, hospital, map, loading, menupage });

export default rootReducer;
