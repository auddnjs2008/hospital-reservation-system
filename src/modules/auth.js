import { createAction, handleActions } from "redux-actions";

const CHANGE_FIELD = "auth/CHANGE_FIELD";

export const changeField = createAction(CHANGE_FIELD);

const initialState = {
  auth: {
    email: "",
    password: "",
  },
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, text } }) => ({
      ...state,
      auth: { ...state.auth, [key]: [text] },
    }),
  },
  initialState
);

export default auth;
