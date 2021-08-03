import { createAction, handleActions } from "redux-actions";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const EMPTY_FIELD = "auth/EMPTY_FIELD";
const LOG_IN = "auth/LOG_IN";
const LOG_OUT = "auth/LOG_OUT";
const IS_MANAGER = "auth/IS_MANAGER";

export const changeField = createAction(CHANGE_FIELD);
export const emptyField = createAction(EMPTY_FIELD);
export const login = createAction(LOG_IN);
export const logout = createAction(LOG_OUT);
export const isManager = createAction(IS_MANAGER);

const initialState = {
  auth: {
    id: "",
    Inputid: "",
    InputPassword: "",
    email: "",
    manager: false,
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
      auth: { Inputid: "", InputPassword: "", email: "" },
    }),
    [LOG_IN]: (state, { payload: { id } }) => ({
      ...state,
      auth: { ...state.auth, id, Inputid: "", InputPassword: "" },
    }),
    [LOG_OUT]: (state) => ({
      ...state,
      auth: {
        id: "",
        Inputid: "",
        InputPassword: "",
        eamil: "",
        manager: false,
      },
    }),
    [IS_MANAGER]: (state) => ({
      ...state,
      auth: { ...state.auth, manager: !state.auth.manager },
    }),
  },
  initialState
);

export default auth;
