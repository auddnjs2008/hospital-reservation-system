import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import pallet from "../../lib/styles/pallet";
import InfoToggleBtn from "./InfoToggleBtn";
import Menu from "./Menu";
import SearchComponent from "../search/SearchComponent";
import { Link } from "react-router-dom";

import { IHospitalItem } from "../../../types";

const PlaceInfoComponentBlock = styled.div`
  /* position: relative; */
  position: fixed;
  z-index: 20;
  /* min-width: 24rem; */
  min-width: 30%;
  height: 100vh;
  transition: transform 0.2s ease-in-out;
  background-color: white;
  header {
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: ${pallet.green[2]};
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
  /* background-color: ${pallet.green[1]}; */
  box-shadow: 0px 1px 1px rgba(15, 15, 15, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.02) translateY(-1%);
  }

  h2 {
    font-size: 1.3rem;
    font-weight: 600;
    color: black;
  }
  .detailInfo {
    width: 100%;

    div {
      display: flex;
      justify-content: center;
      margin-top: 5px;
    }
    span {
      margin-right: 10px;
    }
    a {
      color: black;
      z-index: 30;
      margin-right: 10px;
    }
  }
  .distance {
    margin-left: 10px;
    color: black;
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
  box-shadow: 0px 1px 1px rgba(15, 15, 15, 0.1);
  width: 100%;
  text-align: center;
  font-size: 20px;
  padding-top: 10px;
  &:active {
    transform: scale(0.99);
  }
  div {
    font-size: 0.8rem;
  }
`;

interface IPlaceInfo {
  hospitals: IHospitalItem[];
  id: string;
  map: object | null;
  onMouseOver: (e: React.MouseEvent<HTMLDivElement>) => void;
  onListMouseOver: (e: React.MouseEvent<HTMLDivElement>) => void;
  onBoxClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseOut: (e: React.MouseEvent<HTMLDivElement>) => void;
  onInfoToggleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  RefArray: {
    placeInfoWrapper: React.MutableRefObject<HTMLDivElement | null>;
    hospitalList: React.MutableRefObject<HTMLUListElement | null>;
    main: React.MutableRefObject<HTMLElement | null>;
  };
  toggle: number;
}

const PlaceInfoComponent: React.FC<IPlaceInfo> = ({
  hospitals,
  map,
  onMouseOver,
  onListMouseOver,
  onBoxClick,
  onMouseOut,
  onInfoToggleClick,
  RefArray,
  toggle,
}) => {
  return (
    <PlaceInfoComponentBlock ref={RefArray.placeInfoWrapper}>
      <header>
        <SearchComponent />
        <Menu></Menu>
      </header>
      <main ref={RefArray.main}>
        <h1>👍👍👍👍👍</h1>
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
                <div>
                  <span>{hospitals[0]?.phone}</span>
                  <a
                    id="detail"
                    href={hospitals[0]?.place_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    상세보기
                  </a>
                </div>
                <div>
                  <Link to={`/reservation/${hospitals[0]?.place_name}`}>
                    예약
                  </Link>
                  <Link to={`/review/${hospitals[0]?.place_name}`}>후기</Link>
                  <a
                    href={`https://map.kakao.com/link/to/${hospitals[0]?.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    길찾기
                  </a>
                </div>
              </div>
            </Hospital>
          </div>
        )}
        <ToggleBtn onClick={onInfoToggleClick}>
          {toggle === 0 ? (
            <>
              <div>더 보기</div>
              <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
            </>
          )}
        </ToggleBtn>
        {hospitals && (
          <HospitalList ref={RefArray.hospitalList}>
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
                    <h2>{item.place_name.split(" ")[0]}</h2>
                    <h2>{item.place_name.split(" ")[1]}</h2>
                    <div>
                      {item.address_name}
                      {item.distance && (
                        <span className="distance">{item.distance}m</span>
                      )}
                    </div>
                    <div className="detailInfo">
                      <div>
                        <span>{item.phone}</span>
                        <a
                          id="detail"
                          href={item.place_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          상세보기
                        </a>
                      </div>
                      <div>
                        <Link to={`/reservation/${item.place_name}`}>예약</Link>
                        <Link to={`/review/${item.place_name}`}>후기</Link>
                        <a
                          href={`https://map.kakao.com/link/to/${item.id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          길찾기
                        </a>
                      </div>
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
      <InfoToggleBtn
        placeInfoWrapper={RefArray.placeInfoWrapper}
        mapContainer={map}
      />
    </PlaceInfoComponentBlock>
  );
};

export default React.memo(PlaceInfoComponent);
