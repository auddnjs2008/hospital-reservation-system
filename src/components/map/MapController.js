import {
  faCar,
  faMap,
  faMapMarkerAlt,
  faPlane,
  faPlaneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import pallet from "../../lib/styles/pallet";

const MapControllerBlock = styled.ul`
  display: flex;

  position: absolute;
  top: 10px;
  right: 50px;
  box-shadow: 0px 3px 5px ${pallet.black[5]};
  z-index: 50;
  background-color: #ecf0f1;
  padding: 5px;
  border-radius: 5px;

  li {
    padding: 3px;
    cursor: pointer;
    font-size: 2rem;
    display: flex;
    align-items: center;
    color: ${pallet.green[3]};
    div {
      background-color: #ecf0f1;
    }
  }
`;

const BothIcon = styled.span``;

const MapController = ({ map }) => {
  const [sky, setSky] = useState(false);
  const [road, setRoad] = useState(false);
  const [both, setBoth] = useState(false);
  const bothIcon = useRef();
  const { mapBox, roadMapBox, roadLat, roadLong, menuView } = useSelector(
    ({ map, roadmap, menupage }) => ({
      mapBox: map.mapBox,
      roadMapBox: roadmap.roadmap,
      roadLat: roadmap.latitude,
      roadLong: roadmap.longitude,
      menuView: menupage.infoBtn,
    })
  );
  const onSkyToggleClick = (e) => {
    if (!sky) {
      map.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
    } else {
      map.setMapTypeId(window.kakao.maps.MapTypeId.ROADMAP);
    }
    setSky((item) => !item);
  };

  const onRoadMapToggleClick = (e) => {
    if (!both) {
      // 두개 모드 아닐때
      if (!road) {
        // 로드맵만 크게 켜진다
        roadMapBox.a.style.zIndex = "18";
        mapBox.current.style.zIndex = "15";
        roadMapBox.a.style.width = menuView ? "70%" : "100%";
      } else {
        //지도만 크게 켜진다.
        roadMapBox.a.style.zIndex = "15";
        mapBox.current.style.zIndex = "18";
        mapBox.current.style.width = menuView ? "70%" : "100%";
      }
    } else {
      //두개모드일 떄 => 로드맵 크기 : 15rem ,15rem
      if (!road) {
        // 로드맵크기를 크게 , 맵 크기를 작게   맵 zindex:18 로드맵 zindex15
        // 맵 포지션 바꾸기
        roadMapBox.a.style.width = menuView ? "" : "100%";
        roadMapBox.a.style.height = "";
        roadMapBox.a.style.zIndex = "15";
        mapBox.current.style.zIndex = "18";
        mapBox.current.style.width = "315px";
        mapBox.current.style.height = "180px";
      } else {
        // 맵크기를 크게 로드맵 크기를 작게 로드맵 zindex:18  맵 zindex 15
        roadMapBox.a.style.height = "180px";
        roadMapBox.a.style.width = "315px";
        roadMapBox.a.style.zIndex = "18";
        mapBox.current.style.zIndex = "15";
        mapBox.current.style.width = menuView ? "" : "100%";
        mapBox.current.style.height = "";
      }
    }
    map.relayout();
    roadMapBox.relayout();
    map.setCenter(new window.kakao.maps.LatLng(roadLat, roadLong));
    setRoad((item) => !item);
  };

  const onBothToggleClick = (e) => {
    if (!both) {
      // 두개동시 모드 킬때

      bothIcon.current.style.color = "blue";
      if (!road) {
        mapBox.current.style.zIndex = "15";
        roadMapBox.a.style.zIndex = "18";
        roadMapBox.a.style.height = "180px";
        roadMapBox.a.style.width = "315px";
      } else {
        mapBox.current.style.zIndex = "18";
        roadMapBox.a.style.zIndex = "15";
        roadMapBox.a.style.height = "100vh";
        roadMapBox.a.style.width = menuView ? "70%" : "100%";
        mapBox.current.style.height = "180px";
        mapBox.current.style.width = "315px";
      }
    } else {
      // 두개동시 모드 끌때

      bothIcon.current.style.color = `${pallet.green[3]}`;
      if (!road) {
        roadMapBox.a.style.zIndex = "15";
        mapBox.current.style.zIndex = "18";
        roadMapBox.a.style.height = "";
        roadMapBox.a.style.width = "";
      } else {
        mapBox.current.style.width = "";
        mapBox.current.style.height = "";
        mapBox.current.style.zIndex = "15";
      }
    }
    map.relayout();
    roadMapBox.relayout();
    map.setCenter(new window.kakao.maps.LatLng(roadLat, roadLong));
    setBoth((item) => !item);
  };

  return (
    <MapControllerBlock>
      <li onClick={onSkyToggleClick}>
        <FontAwesomeIcon icon={!sky ? faPlane : faPlaneSlash}></FontAwesomeIcon>
      </li>
      <li onClick={onRoadMapToggleClick}>
        <FontAwesomeIcon icon={!road ? faCar : faMap}></FontAwesomeIcon>
      </li>
      <li onClick={onBothToggleClick}>
        <BothIcon ref={bothIcon}>
          <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
        </BothIcon>
      </li>
    </MapControllerBlock>
  );
};

export default MapController;
