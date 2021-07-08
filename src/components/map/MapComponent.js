import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialMap } from "../../modules/map";
import styled from "styled-components";
import Loading from "../common/Loading";

const MapComponentBlock = styled.div``;
const MapContainer = styled.div`
  width: 70vw;
  height: 100vh;
  transition: transform 0.2s ease-in-out;
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
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const bounds = new kakao.maps.LatLngBounds();
    if (hospitals) {
      hospitals.forEach((item, index) => {
        const eachLang = new kakao.maps.LatLng(item.y, item.x);
        bounds.extend(eachLang);
        const marker = new kakao.maps.Marker({
          map,
          position: eachLang,
          title: item.place_name,
          image: markerImage,
        });
      });
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
  }, [hospitals]);

  return (
    <MapComponentBlock>
      <MapContainer ref={mapContainer}></MapContainer>
    </MapComponentBlock>
  );
};

export default MapComponent;
