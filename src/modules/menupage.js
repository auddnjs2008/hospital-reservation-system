import { createAction, handleActions } from "redux-actions";

const USER_PAGE = "menupage/USER_PAGE";
const RESERVATION_PAGE = "menupage/RESERVATION_PAGE";
const INFOTOGGLE_CLICK = "menupage/INFOTOGGLE_CLICK";

export const userPage = createAction(USER_PAGE);
export const reservationPage = createAction(RESERVATION_PAGE);
export const infoToggleClick = createAction(INFOTOGGLE_CLICK);

const initialState = {
  userpage: null,
  rvpage: null,
  infoBtn: true,
};

const menupage = handleActions(
  {
    [USER_PAGE]: (state, { payload: userpage }) => ({ userpage }),
    [RESERVATION_PAGE]: (state, { payload: rvpage }) => ({ rvpage }),
    [INFOTOGGLE_CLICK]: (state) => ({ ...state, infoBtn: !state.infoBtn }),
  },
  initialState
);

export default menupage;