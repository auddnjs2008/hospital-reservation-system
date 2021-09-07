import { createAction, handleActions } from "redux-actions";
import { IAuth } from "../../types";

const CHANGE_FIELD = "auth/CHANGE_FIELD" as const;
const EMPTY_FIELD = "auth/EMPTY_FIELD" as const;
const LOG_IN = "auth/LOG_IN" as const;
const LOG_OUT = "auth/LOG_OUT" as const;
const IS_MANAGER = "auth/IS_MANAGER" as const;

export const changeField = createAction(CHANGE_FIELD);
export const emptyField = createAction(EMPTY_FIELD);
export const login = createAction(LOG_IN);
export const logout = createAction(LOG_OUT);
export const isManager = createAction(IS_MANAGER);

const initialState: IAuth = {
  auth: {
    id: "",
    password: "",
    Inputid: "",
    InputPassword: "",
    email: "",
    manager: false,
    hospital: "",
  },
};

const auth = handleActions<IAuth, any>(
  {
    [CHANGE_FIELD]: (state, { payload: { key, text } }) => ({
      ...state,
      auth: { ...state.auth, [key]: text },
    }),
    [EMPTY_FIELD]: (state) => ({
      ...state,
      auth: { ...state.auth, Inputid: "", InputPassword: "", email: "" },
    }),
    [LOG_IN]: (state, { payload: { id } }) => ({
      ...state,
      auth: { ...state.auth, id, Inputid: "", InputPassword: "" },
    }),
    [LOG_OUT]: (state) => ({
      ...state,
      auth: {
        ...state.auth,
        id: "",
        Inputid: "",
        InputPassword: "",
        eamil: "",
        manager: false,
      },
    }),
    [IS_MANAGER]: (state, { payload: { hospital } }) => ({
      ...state,
      auth: { ...state.auth, manager: !state.auth.manager, hospital },
    }),
  },
  initialState
);

export default auth;
