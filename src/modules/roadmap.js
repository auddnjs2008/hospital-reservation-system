import { createAction, handleActions } from "redux-actions";

const CHANGE_COORDINATE = "roadmap/CHANGE_COORDINATE";

export const changeCoordinate = createAction(CHANGE_COORDINATE);

const initialState = {};

const roadmap = handleActions(
  {
    [CHANGE_COORDINATE]: (state, payload) => ({
      ...state,
      latitude: payload.latitude,
      longitude: payload.longitude,
    }),
  },
  initialState
);

export default roadmap;
