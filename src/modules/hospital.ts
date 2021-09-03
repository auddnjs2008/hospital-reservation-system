import { createAction, handleActions } from "redux-actions";
import { IHospital } from "../../types";

const CLICK_HOSPITAL = "hospital/CLICK_HOSPITAL" as const;
const INITIAL_HOSPITAL_KIND = "hospital/INITIAL_HOSPITAL_KIND" as const;

export const clickHospital = createAction(CLICK_HOSPITAL);
export const initialHospital = createAction(INITIAL_HOSPITAL_KIND);

const initialState: IHospital = {
  hospital: { kind: "" },
};

const hospital = handleActions<IHospital, any>(
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
