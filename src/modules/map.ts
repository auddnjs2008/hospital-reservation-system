import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as recommendApi from "../lib/api/recommend";
import { IMap } from "../../types";

const [INITIAL_WHERE, WHERE_SUCCESS, WHERE_FAILRUE] =
  createRequestActionTypes("map/INITIAL_WHERE");
const INITIAL_MAP = "map/INITIAL_MAP" as const;
const INITIAL_HOSPITALS = "map/INITAL_HOSPITALS" as const;
const SEARCH_MAP = "map/SEARCH_MAP" as const;
const DRAW_MARKER = "map/DRAW_MARKER" as const;
const ERASE_MARKER = "map/ERASE_MARKER" as const;

export const initialWhere = createAction(INITIAL_WHERE);
export const initialMap = createAction(INITIAL_MAP);
export const initialMapHospitals = createAction(INITIAL_HOSPITALS);
export const searchMap = createAction(SEARCH_MAP);
export const drawMarker = createAction(DRAW_MARKER);
export const eraseMarker = createAction(ERASE_MARKER);

// 사가 생성

const recommendSaga = createRequestSaga(
  INITIAL_WHERE,
  recommendApi.recommendPlace
);

export function* mapSaga() {
  yield takeLatest(INITIAL_WHERE, recommendSaga);
}

const initialState: IMap = {
  map: null,
  mapBox: null,
  markers: [],
  latitude: "",
  longitude: "",
  hospitals: [],
  recommendError: null,
};

const map = handleActions<IMap, any>(
  {
    [INITIAL_WHERE]: (state, { payload: { latitude, longitude } }) => ({
      ...state,
      latitude,
      longitude,
    }),
    [WHERE_SUCCESS]: (state, payload) => ({
      ...state,
      hospitals: payload.payload,
    }), // 추천알고리즘으로 재배열
    [WHERE_FAILRUE]: (state, payload) => ({
      ...state,
      recommendError: payload.payload,
    }),
    [INITIAL_MAP]: (state, { payload: { map, mapBox } }) => ({
      ...state,
      map,
      mapBox,
    }),
    [INITIAL_HOSPITALS]: (state) => ({ ...state, hospitals: [] }),

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
