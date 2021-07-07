import { createAction, handleActions } from "redux-actions";

const INITIAL_WHERE = "map/INITIAL_WHERE";

export const initialWhere = createAction(INITIAL_WHERE);

const initialState = {
  latitude: 0,
  longitude: 0,
  hospitals: [],
};

const map = handleActions(
  {
    [INITIAL_WHERE]: (
      state,
      { payload: { latitude, longitude, hospitals } }
    ) => ({
      latitude,
      longitude,
      hospitals,
    }),
  },
  initialState
);

export default map;
