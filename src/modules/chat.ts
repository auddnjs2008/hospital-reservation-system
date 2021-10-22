import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import { IChat } from "../../types";
import { getOneManager } from "../lib/api/chat";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";

const ALL_CHAT_BTN = "chat/ALL_CHAT_BTN" as const;
const BACK_CHAT_BTN = "chat/BACK_CHAT_BTN" as const;

const [RV_CHAT_BTN, RV_CHAT_SUCCESS, RV_CHAT_FAILRUE] =
  createRequestActionTypes("chat/RV_CHAT_BTN");

export const rvchatbtn = createAction(RV_CHAT_BTN);
export const allchatbtn = createAction(ALL_CHAT_BTN);
export const backchatbtn = createAction(BACK_CHAT_BTN);

// 사가생성
const rvChatBtnSaga = createRequestSaga(RV_CHAT_BTN, getOneManager);

export function* chatSaga() {
  yield takeLatest(RV_CHAT_BTN, rvChatBtnSaga);
}

const initialState: IChat = { name: "", window: false, id: "" };

const chat = handleActions<IChat, any>(
  {
    [RV_CHAT_BTN]: (state, { payload }) => ({
      ...state,
      name: payload,
      window: !state.window,
    }),
    [RV_CHAT_SUCCESS]: (state, payload) => ({ ...state, id: payload.payload }),
    [RV_CHAT_FAILRUE]: (state, payload) => ({
      ...state,
      error: payload,
      payload,
    }),
    [ALL_CHAT_BTN]: (state) => ({
      ...state,
      id: "",
      name: "",
      window: !state.window,
    }),
    [BACK_CHAT_BTN]: (state) => ({ ...state, id: "", name: "" }),
  },
  initialState
);

export default chat;
