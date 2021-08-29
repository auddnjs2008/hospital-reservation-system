import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawMarker, initialMap } from "../../modules/map";
import styled from "styled-components";
import MapController from "./MapController";
import RoadviewComponent from "./RoadviewComponent";
import "../../lib/styles/mapwalker.css";
import { useCallback } from "react";
import Loading from "../common/Loading";

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

const kakao = window.kakao;
const MapComponent = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [map, setMap] = useState();
  const { lat, long, hospitals } = useSelector(({ map }) => ({
    lat: map.latitude,
    long: map.longitude,
    hospitals: map.hospitals,
  }));
  const mapContainer = useRef();

  //지도를 찾으면 마커를 생성해 준다.
  const markerDraw = useCallback(() => {
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    const imageSize = new kakao.maps.Size(24, 35);
    const bounds = new kakao.maps.LatLngBounds();
    const markers = [];
    if (hospitals) {
      hospitals.forEach((item, index) => {
        const imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(2, index * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        };
        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        );
        const eachLang = new kakao.maps.LatLng(item.y, item.x);
        bounds.extend(eachLang);
        const marker = new kakao.maps.Marker({
          map,
          position: eachLang,
          title: item.place_name,
          image: markerImage,
        });
        markers.push(marker);
      });
      if (markers.length) dispatch(drawMarker({ markers }));
    }
    if (map) map.setBounds(bounds);
  }, [dispatch, hospitals, kakao.maps, map]);

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(lat, long),
      level: 3,
    };
    const newMap = new kakao.maps.Map(mapContainer.current, options);
    setMap(newMap);
    dispatch(initialMap({ map: newMap, mapBox: mapContainer }));
  }, [lat, long, dispatch, kakao.maps]); // lat,long 을 써준이유?

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
