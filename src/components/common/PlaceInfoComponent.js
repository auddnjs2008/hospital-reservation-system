import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import pallet from "../../lib/styles/pallet";
import InfoToggleBtn from "./InfoToggleBtn";
import Menu from "./Menu";
import SearchComponent from "../search/SearchComponent";
import { Link, withRouter } from "react-router-dom";
import { changeCoordinate } from "../../modules/roadmap";

const PlaceInfoComponentBlock = styled.div`
  position: relative;
  z-index: 20;
  min-width: 24rem;
  height: 100vh;
  transition: transform 0.2s ease-in-out;
  background-color: white;
  header {
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: ${pallet.green[0]};
  }
  main {
    margin-top: 10px;
    padding: 10px;
    max-height: 65%;
    overflow: scroll;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
`;

const Hospital = styled.div`
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  height: 10rem;
  border-radius: 5px;
  background-color: ${pallet.black[1]};
  /* box-shadow: 0px 3px 5px ${pallet.green[3]},
    inset 0px 0px 5px ${pallet.green[3]}; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.02) translateY(-1%);
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .detailInfo {
    span {
      margin-right: 10px;
    }
    a {
      color: red;
      z-index: 30;
      margin-right: 10px;
    }
  }
  .distance {
    margin-left: 10px;
    color: red;
  }
`;

const HospitalList = styled.ul`
  margin-top: 20px;
  height: 20rem;
  overflow: scroll;
  overflow-x: hidden;
  opacity: 0;
  background-color: white;
  padding-right: 3px;
`;

const ToggleBtn = styled.button`
  all: unset;
  box-shadow: 0px 1px 3px rgba(15, 15, 15, 0.4);
  width: 100%;
  text-align: center;
  font-size: 20px;
  padding-top: 10px;
  &:active {
    transform: scale(0.99);
  }
`;

const PlaceInfoComponent = ({ hospitals, history }) => {
  const { map } = useSelector(({ map }) => ({ map: map.map }));
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(0);
  let markerControl = null;
  let infoWindow = null;
  const placeInfoWrapper = useRef();
  const hospitalList = useRef();
  const main = useRef();
  const onInfoToggleClick = (e) => {
    if (
      hospitalList.current.style.opacity === "0" ||
      hospitalList.current.style.opacity === ""
    ) {
      hospitalList.current.style.opacity = "1";
      main.current.scrollTop = main.current.scrollWidth;
      main.current.position = "fixed";
      setToggle(1);
    } else {
      main.current.scrollTop = 0;
      hospitalList.current.style.opacity = "0";
      main.current.position = "fixed";
      setToggle(0);
    }
  };

  const createBigMarker = (index) => {
    const kakao = window.kakao;
    const target = hospitals[index];
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
      infoWindow.open(map, marker);
      markerControl = marker;
    }
  };

  const onMouseOut = () => {
    if (markerControl !== null) markerControl.setMap(null);
    infoWindow?.close();
  };

  const onMouseOver = (e) => {
    createBigMarker(e.currentTarget.id);
  };
  const onListMouseOver = (e) => {
    if (hospitalList.current.style.opacity !== "0") {
      createBigMarker(e.currentTarget.id);
    }
  };

  const onBoxClick = (e) => {
    // if (e.target.id !== "detail") history.push(`/reservation/${id}`);
    const hospital = hospitals[e.currentTarget.id];
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
    <PlaceInfoComponentBlock ref={placeInfoWrapper}>
      <header>
        <SearchComponent />
        <Menu></Menu>
      </header>
      <main ref={main}>
        <h1>Best Place</h1>
        {hospitals && (
          <div key={hospitals[0]?.id}>
            <Hospital
              id="0"
              className="hospital"
              onClick={onBoxClick}
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
            >
              <h2>{hospitals[0]?.place_name}</h2>
              <div>
                {hospitals[0]?.address_name}
                {hospitals[0]?.distance && (
                  <span className="distance">{hospitals[0].distance}m</span>
                )}
              </div>
              <div className="detailInfo">
                <span>{hospitals[0]?.phone}</span>
                <a id="detail" href={hospitals[0]?.place_url} target="_blank">
                  상세보기
                </a>
                <Link to={`/reservation/${hospitals[0]?.id}`}>예약하기</Link>
              </div>
            </Hospital>
          </div>
        )}
        <ToggleBtn onClick={onInfoToggleClick}>
          {toggle === 0 ? (
            <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
          )}
        </ToggleBtn>
        {hospitals && (
          <HospitalList ref={hospitalList}>
            {hospitals.map((item, index) =>
              index !== 0 ? (
                <div key={item.id}>
                  <Hospital
                    id={`${index}`}
                    className="hospital"
                    onMouseOver={onListMouseOver}
                    onMouseOut={onMouseOut}
                    onClick={onBoxClick}
                  >
                    <h2>{item.place_name}</h2>
                    <div>
                      {item.address_name}
                      {item.distance && (
                        <span className="distance">{item.distance}m</span>
                      )}
                    </div>
                    <div className="detailInfo">
                      <span>{item.phone}</span>
                      <a id="detail" href={item.place_url} target="_blank">
                        상세보기
                      </a>
                      <Link to={`/reservation/${item.id}`}>예약하기</Link>
                    </div>
                  </Hospital>
                </div>
              ) : (
                ""
              )
            )}
          </HospitalList>
        )}
      </main>
      <InfoToggleBtn placeInfoWrapper={placeInfoWrapper} mapContainer={map} />
    </PlaceInfoComponentBlock>
  );
};

export default withRouter(PlaceInfoComponent);
