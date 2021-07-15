import { createAction, handleActions } from "redux-actions";

const CLICK_HOSPITAL = "hospital/CLICK_HOSPITAL";
const INITIAL_HOSPITAL_KIND = "hospital/INITIAL_HOSPITAL_KIND";

export const clickHospital = createAction(CLICK_HOSPITAL);
export const initialHospital = createAction(INITIAL_HOSPITAL_KIND);

const initialState = {
  hospital: { kind: "" },
};

const hospital = handleActions(
  {
    [CLICK_HOSPITAL]: (state, { payload: { kind } }) => ({
      ...state,
      hospital: { ...state.hospital, kind },
    }),
    [INITIAL_HOSPITAL_KIND]: (state) => ({ hospital: { kind: "" } }),
  },
  initialState
);

export default hospital;
