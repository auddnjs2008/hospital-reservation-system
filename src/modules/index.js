import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth from "./auth";
import hospital from "./hospital";
import map, { mapSaga } from "./map";
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

export function* rootSaga() {
  yield all([mapSaga()]);
}
export default rootReducer;
