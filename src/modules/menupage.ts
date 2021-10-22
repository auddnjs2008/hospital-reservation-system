import { createAction, handleActions } from "redux-actions";
import { IPage } from "../../types";

const USER_PAGE = "menupage/USER_PAGE" as const;
const RESERVATION_PAGE = "menupage/RESERVATION_PAGE" as const;
const REVIEW_PAGE = "menpage/REVIEW_PAGE" as const;
const MAP_PAGE = "menupage/MAP_PAGE" as const;
const INFOTOGGLE_CLICK = "menupage/INFOTOGGLE_CLICK" as const;

export const userPage = createAction(USER_PAGE);
export const reservationPage = createAction(RESERVATION_PAGE);
export const infoToggleClick = createAction(INFOTOGGLE_CLICK);
export const reviewPage = createAction(REVIEW_PAGE);
export const mapPage = createAction(MAP_PAGE);

const initialState: IPage = {
  userpage: null,
  rvpage: null,
  reviewpage: null,
  infoBtn: true,
};

const menupage = handleActions<IPage, any>(
  {
    [USER_PAGE]: (state, { payload: userpage }) => ({
      ...state,
      rvpage: null,
      reviewpage: null,
      userpage,
    }),
    [RESERVATION_PAGE]: (state, { payload: rvpage }) => ({
      ...state,
      userpage: null,
      reviewpage: null,
      rvpage,
    }),
    [INFOTOGGLE_CLICK]: (state) => ({ ...state, infoBtn: !state.infoBtn }),
    [REVIEW_PAGE]: (state, { payload: reviewpage }) => ({
      ...state,
      userpage: null,
      rvpage: null,
      reviewpage,
    }),
  },
  initialState
);

export default menupage;
