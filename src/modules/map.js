import { createAction, handleActions } from "redux-actions";

const INITIAL_WHERE = "map/INITIAL_WHERE";
const INITIAL_MAP = "map/INITIAL_MAP";
const SEARCH_MAP = "map/SEARCH_MAP";
const DRAW_MARKER = "map/DRAW_MARKER";
const ERASE_MARKER = "map/ERASE_MARKER";

export const initialWhere = createAction(INITIAL_WHERE);
export const initialMap = createAction(INITIAL_MAP);
export const searchMap = createAction(SEARCH_MAP);
export const drawMarker = createAction(DRAW_MARKER);
export const eraseMarker = createAction(ERASE_MARKER);

const initialState = {
  map: null,
  mapBox: null,
  markers: [],
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
      ...state,
      latitude,
      longitude,
      hospitals,
    }),
    [INITIAL_MAP]: (state, { payload: { map, mapBox } }) => ({
      ...state,
      map,
      mapBox,
    }),
    [SEARCH_MAP]: (state, { payload: { hospitals } }) => ({
      ...state,
      hospitals,
    }),
    [DRAW_MARKER]: (state, { payload: { markers } }) => ({ ...state, markers }),
    [ERASE_MARKER]: (state, action) => ({ ...state, markers: [] }),
  },
  initialState
);

export default map;
