import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/loading";

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      let response;
      if (type === "map/INITIAL_WHERE") {
        response = yield call(request, { info: action.payload.hospitals });
      }
      yield put({
        type: SUCCESS,
        payload: JSON.parse(response.data.body),
        meta: response,
      });
    } catch (e) {
      yield put({ type: FAILURE, payload: e, error: true });
    }
  };
}
