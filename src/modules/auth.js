import { createAction, handleActions } from "redux-actions";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const EMPTY_FIELD = "auth/EMPTY_FIELD";
const LOADED = "auth/LOADED";
const LOG_OUT = "aith/LOG_OUT";

export const changeField = createAction(CHANGE_FIELD);
export const emptyField = createAction(EMPTY_FIELD);
export const loaded = createAction(LOADED);
export const logout = createAction(LOG_OUT);

const initialState = {
  auth: {
    id: "",
    password: "",
    confirm: false,
    email: "",
  },
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, text } }) => ({
      ...state,
      auth: { ...state.auth, [key]: text },
    }),
    [EMPTY_FIELD]: (state) => ({
      ...state,
      auth: { id: "", password: "", email: "" },
    }),
    [LOADED]: (state, { payload: id }) => ({
      ...state,
      auth: { ...state.auth, id },
    }),
    [LOG_OUT]: (state) => ({
      ...state,
      auth: { id: "", password: "", confrim: false, eamil: "" },
    }),
  },
  initialState
);

export default auth;
