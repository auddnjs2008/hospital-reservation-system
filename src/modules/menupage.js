import { createAction, handleActions } from "redux-actions";

const USER_PAGE = "menupage/USER_PAGE";
const RESERVATION_PAGE = "menupage/RESERVATION_PAGE";

export const userPage = createAction(USER_PAGE);
export const reservationPage = createAction(RESERVATION_PAGE);

const initialState = {};

const menupage = handleActions(
  {
    [USER_PAGE]: (state, { payload: userpage }) => ({ userpage }),
    [RESERVATION_PAGE]: (state, { payload: rvpage }) => ({ rvpage }),
  },
  initialState
);

export default menupage;
