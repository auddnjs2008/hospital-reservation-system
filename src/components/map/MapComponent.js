import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawMarker, initialMap } from "../../modules/map";
import styled from "styled-components";
import MapController from "./MapController";
import RoadviewComponent from "./RoadviewComponent";
import "../../lib/styles/mapwalker.css";

const MapComponentBlock = styled.div`
  position: realtive;
`;
const MapContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 70vw;
  height: 100vh;
  transition: transform 0.2s ease-in-out;
  z-index: 18;
`;

const MapComponent = () => {
  const kakao = window.kakao;
  const dispatch = useDispatch();

  const [map, setMap] = useState();
  const { lat, long, hospitals } = useSelector(({ map }) => ({
    lat: map.latitude,
    long: map.longitude,
    hospitals: map.hospitals,
  }));
  const mapContainer = useRef();

  //지도를 찾으면 마커를 생성해 준다.
  const markerDraw = () => {
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
      dispatch(drawMarker({ markers }));
    }
    if (map) map.setBounds(bounds);
  };

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(lat, long),
      level: 3,
    };
    const newMap = new kakao.maps.Map(mapContainer.current, options);
    setMap(newMap);
    dispatch(initialMap({ map: newMap, mapBox: mapContainer }));
  }, [lat, long]);

  useEffect(() => {
    if (hospitals) markerDraw();
  }, [hospitals, map]);

  return (
    <MapComponentBlock>
      <MapContainer ref={mapContainer}></MapContainer>
      <MapController map={map} />
      <RoadviewComponent />
    </MapComponentBlock>
  );
};

export default MapComponent;
