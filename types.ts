import { RefObject } from "react";
import { RouteComponentProps } from 'react-router';

export interface IUser {
  username: string;
  attributes: { [index: string]: { message: string } };
}
export interface IAuth {
  auth: {
    id: string;
    Inputid: string;
    InputPassword: string;
    email: string;
    manager: boolean;
    hospital: string;
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

export interface IMap {
  map: object | null;
  mapBox: RefObject<HTMLElement> | null;
  markers: object[];
  latitude: string;
  longitude: string;
  hospitals: string[];
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
  roadmap: RefObject<HTMLElement> | null;
}

export interface resultType {
  config: any;
  data: any;
  headers: any;
  request: any;
  status: any;
  statusText: any;
}


export interface Props extends RouteComponentProps;

export type This{
  walker:any;
  content:any;
}
