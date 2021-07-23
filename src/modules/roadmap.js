import { createAction, handleActions } from "redux-actions";

const CHANGE_COORDINATE = "roadmap/CHANGE_COORDINATE";
const INITIALIZE_ROADMAP = "roadmap/INITIALIZE_ROADMAP";

export const changeCoordinate = createAction(CHANGE_COORDINATE);
export const initialzeRoadmap = createAction(INITIALIZE_ROADMAP);

const initialState = {
  latitude: "",
  longitude: "",
  name: "",
  roadmap: null,
};

const roadmap = handleActions(
  {
    [INITIALIZE_ROADMAP]: (state, { payload }) => ({
      ...state,
      roadmap: payload,
    }),
    [CHANGE_COORDINATE]: (
      state,
      { payload: { latitude, longitude, name } }
    ) => ({
      ...state,
      latitude,
      longitude,
      name,
    }),
  },
  initialState
);

export default roadmap;
