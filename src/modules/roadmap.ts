import { createAction, handleActions } from "redux-actions";
import { IRoadMap } from "../../types";

const CHANGE_COORDINATE = "roadmap/CHANGE_COORDINATE" as const;
const INITIALIZE_ROADMAP = "roadmap/INITIALIZE_ROADMAP" as const;

export const changeCoordinate = createAction(CHANGE_COORDINATE);
export const initialzeRoadmap = createAction(INITIALIZE_ROADMAP);

const initialState: IRoadMap = {
  latitude: "",
  longitude: "",
  name: "",
  roadmap: null,
};

const roadmap = handleActions<IRoadMap, any>(
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
