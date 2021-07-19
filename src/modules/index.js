import { combineReducers } from "redux";
import auth from "./auth";
import hospital from "./hospital";
import map from "./map";
import loading from "./loading";
import menupage from "./menupage";
import roadmap from "./roadmap";
const rootReducer = combineReducers({
  auth,
  hospital,
  map,
  loading,
  menupage,
  roadmap,
});

export default rootReducer;
