import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth from "./auth";
import hospital from "./hospital";
import map, { mapSaga } from "./map";
import loading from "./loading";
import menupage from "./menupage";
import roadmap from "./roadmap";
import chat, { chatSaga } from "./chat";
const rootReducer = combineReducers({
  auth,
  hospital,
  map,
  loading,
  menupage,
  roadmap,
  chat,
});

export function* rootSaga() {
  yield all([mapSaga(), chatSaga()]);
}
export default rootReducer;
