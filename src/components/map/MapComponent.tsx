import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawMarker, initialMap } from "../../modules/map";
import styled from "styled-components";
import MapController from "./MapController";
import RoadviewComponent from "./RoadviewComponent";
import "../../lib/styles/mapwalker.css";

import Loading from "../common/Loading";
import { IHospitalItem, IMap } from "../../../types";

const MapComponentBlock = styled.div`
  position: realtive;
`;
const MapContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 70%;

  height: 100vh;
  transition: transform 0.2s ease-in-out;
  z-index: 18;
`;

const kakao = (window as any).kakao;

interface IMapComponent {
  mapInfo: { latitude: string; longitude: string; hospitals: IHospitalItem[] };
}

const MapComponent: React.FC<IMapComponent> = ({ mapInfo }) => {
  const { latitude, longitude, hospitals } = mapInfo;
  const [loader, setLoader] = useState(true);

  // const { lat, long, hospitals } = useSelector(({ map }: IWrapper) => ({
  //   lat: map.latitude,
  //   long: map.longitude,
  //   hospitals: map.hospitals,
  // }));
  const mapContainer = useRef();

  //지도를 찾으면 마커를 생성해 준다.

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
    const newMap = new kakao.maps.Map(mapContainer.current, options);
    setMap(newMap);
    dispatch(initialMap({ map: newMap, mapBox: mapContainer }));
  }, [latitude, longitude, dispatch, kakao.maps]); // lat,long 을 써준이유?

  useEffect(() => {
    if (hospitals) markerDraw();
  }, [hospitals, map, markerDraw]);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  return (
    <MapComponentBlock>
      {loader && <Loading></Loading>}
      <MapContainer ref={mapContainer}></MapContainer>
      <MapController map={map} />
      <RoadviewComponent />
    </MapComponentBlock>
  );
};

export default MapComponent;
