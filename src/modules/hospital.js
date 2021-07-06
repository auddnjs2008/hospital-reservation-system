import { createAction, handleActions } from "redux-actions";

const CLICK_HOSPITAL = "hospital/CLICK_HOSPITAL";

export const clickHospital = createAction(CLICK_HOSPITAL);

const initialState = {
  hospital: { kind: "" },
};

const hospital = handleActions(
  {
    [CLICK_HOSPITAL]: (state, { payload: { kind } }) => ({
      ...state,
      hospital: { ...state.hospital, kind },
    }),
  },
  initialState
);

export default hospital;
