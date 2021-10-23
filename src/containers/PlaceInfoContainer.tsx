import React, { useCallback, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { IAuth, IMap } from "../../types";
import PlaceInfoComponent from "../components/common/PlaceInfoComponent";

import { postRecentPage } from "../lib/api/reservation";
import { changeCoordinate } from "../modules/roadmap";

interface IWrapper {
  map: IMap;
  auth: IAuth;
}
interface IInfoWindow {
  open: (map: object | null, marker: object) => void;
  close: () => void;
}

interface IMarkerControl {
  setMap: (map: null | object) => void;
}

const PlaceInfoContainer = () => {
  const dispatch = useDispatch();
  const { hospitals, id, map } = useSelector(({ map, auth }: IWrapper) => ({
    hospitals: map.hospitals,
    id: auth.auth.id,
    map: map.map,
  }));
  let markerControl: null | IMarkerControl = null;
  let infoWindow: null | IInfoWindow = null;

  const [toggle, setToggle] = useState(0);

  const placeInfoWrapper = useRef<HTMLDivElement | null>(null);
  const hospitalList = useRef<HTMLUListElement | null>(null);
  const main = useRef<HTMLElement | null>(null);

  const onInfoToggleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (
        hospitalList.current &&
        (hospitalList.current.style.opacity === "0" ||
          hospitalList.current.style.opacity === "")
      ) {
        hospitalList.current.style.opacity = "1";
        if (main.current) {
          main.current.scrollTop = main.current.scrollWidth;
        }
        setToggle(1);
      } else {
        if (main.current && hospitalList.current) {
          main.current.scrollTop = 0;
          hospitalList.current.style.opacity = "0";
        }
        setToggle(0);
      }
    },
    [toggle]
  );

  const axiosFun = async (hospital: string) => {
    try {
      await postRecentPage(id, hospital);
    } catch (e) {
      alert(`${e}`);
    }
  };

  const createBigMarker = (index: string) => {
    const kakao = (window as any).kakao;
    const target = hospitals[Number(index)];
    if (target) {
      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      const imageSize = new kakao.maps.Size(24 * 1.5, 35 * 1.5);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const eachLang = new kakao.maps.LatLng(target.y, target.x);
      const marker = new kakao.maps.Marker({
        map,
        position: eachLang,
        title: target.place_name,
        image: markerImage,
      });
      infoWindow = new kakao.maps.InfoWindow({
        position: eachLang,
        content: `<div style="padding:2px;  border:none;">${target.place_name}</div>`,
      });
      infoWindow!.open(map, marker);
      markerControl = marker;
    }
  };

  const onMouseOut = () => {
    if (markerControl !== null) markerControl.setMap(null);
    infoWindow?.close();
  };

  const onMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    createBigMarker(e.currentTarget.id);
  };

  const onListMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hospitalList.current && hospitalList.current.style.opacity !== "0") {
      createBigMarker(e.currentTarget.id);
    }
  };

  const onBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const hospital = hospitals[Number(e.currentTarget.id)];
    if ((e.target as HTMLDivElement).tagName === "A") {
      if (hospital) axiosFun(hospital.place_name);
    }
    if (hospital)
      dispatch(
        changeCoordinate({
          latitude: hospital.y,
          longitude: hospital.x,
          name: hospital.place_name,
        })
      );
    onMouseOut();
  };

  return (
    <PlaceInfoComponent
      hospitals={
        hospitals.length
          ? hospitals
          : JSON.parse(localStorage.getItem("hospitals")!)
      }
      id={id}
      map={map}
      onMouseOver={onMouseOver}
      onListMouseOver={onListMouseOver}
      onBoxClick={onBoxClick}
      onMouseOut={onMouseOut}
      onInfoToggleClick={onInfoToggleClick}
      RefArray={{ placeInfoWrapper, hospitalList, main }}
      toggle={toggle}
    ></PlaceInfoComponent>
  );
};

export default PlaceInfoContainer;
