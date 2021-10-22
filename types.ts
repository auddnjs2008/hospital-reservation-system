import { Dispatch, RefObject } from "react";
import { RouteComponentProps } from "react-router";

export interface IUser {
  username: string;
  attributes: { [index: string]: { message: string } };
}
export interface IAuth {
  auth: {
    [key: string]: string | boolean;
    id: string;
    Inputid: string;
    InputPassword: string;
    email: string;
    manager: boolean;
    hospital: string;
    password: string;
  };
}

export interface IChat {
  name: string;
  window: boolean;
  id: string;
}

export interface IHospital {
  hospital: { kind: string };
}

export interface IHospitalItem {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface IMap {
  map: any;
  mapBox: RefObject<HTMLElement> | null;
  markers: object[];
  latitude: string;
  longitude: string;
  hospitals: IHospitalItem[];
  recommendError: object | null;
}

export interface IPage {
  userpage: RefObject<HTMLElement> | null;
  rvpage: RefObject<HTMLElement> | null;
  reviewpage: RefObject<HTMLElement> | null;
  infoBtn: boolean;
}

export interface IRoadMap {
  latitude: string;
  longitude: string;
  name: string;
  roadmap: any;
}

export interface resultType {
  config: any;
  data: any;
  headers: any;
  request: any;
  status: any;
  statusText: any;
}

export interface IStore {
  auth: IAuth;
  hospital: IHospital;
  map: IMap;
  menupage: IPage;
  roadmap: IRoadMap;
  chat: IChat;
}

export interface IReserveData {
  hospitalName: string;
  time: string;
  doctorName: string;
}

export interface IIndex {
  [index: string]: ITimes[];
}

export interface ITimes {
  name: string;
  doctorName: string;
  time: string;
}

export interface IChatItems {
  from: string;
  time: string;
  message: string;
}

//////////////////////////////////  component - container
export interface IReservationComponent {
  hospitalName: string;
  hospitals: IHospitalItem[];
}

export interface IDoctorComponent {
  doctor: string;
  hospitalName: string;
  setDoctor: React.Dispatch<React.SetStateAction<string>>;
  phone: string | null;
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ICalender {
  doctor: string;
  hospitalName: string;
}

export interface ICalenderHeader {
  today: Date;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  mYear: number;
  mMonth: number;
}

export interface IDates {
  mYear: number;
  mMonth: number;
  setDay: React.Dispatch<React.SetStateAction<number>>;
  setTimeWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISelectTime {
  plans: any;
  setPlans: React.Dispatch<any>;
  mDate: { year: number; month: number; day: number };
  setTimeWindow: React.Dispatch<React.SetStateAction<boolean>>;
  doctor: string;
  hospitalName: string;
}

export interface IReviewComponent {
  hospital: string;
  reviews: { UserName: string; comment: string }[];
  rate: number;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IReviewWrite {
  scroll: number;
  hospital: string;
  setReview: React.Dispatch<React.SetStateAction<boolean>> | null;
  rvPage: boolean | null;
  setReload: React.Dispatch<React.SetStateAction<boolean>> | null;
}

export interface IChatComponent {
  dispatch: Dispatch<any>;
  chatRvName: string;
  chatShow: boolean;
  id: string;
}

export interface IChatForm {
  id: string;
  oneChater: string;
  setChater: React.Dispatch<React.SetStateAction<string>>;
  webSocket: React.MutableRefObject<WebSocket | null>;
  setInChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAskComponent {
  onItemClick: (e: React.MouseEvent<HTMLUListElement>) => void;
}

export interface IInfoToggleBtn {
  placeInfoWrapper: React.MutableRefObject<HTMLDivElement | null>;
  mapContainer: object | null;
}

export interface IButton {
  content: string;
}

export interface IAuthForm {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  content: string;
  text: { id: string; password: string; email: string };
}

export interface IAuthCheckBoxes {
  manager: React.RefObject<HTMLInputElement>;
  user: React.RefObject<HTMLInputElement>;
  setHospital: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  content: string;
}

export interface Props extends RouteComponentProps {}
