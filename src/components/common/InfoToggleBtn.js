import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { infoToggleClick } from "../../modules/menupage";

const InfoToggleBtnBlock = styled.button`
  position: absolute;
  top: 50%;
  right: -20px;
  z-index: 20;
  border: 1px solid black;
  width: 20px;
  height: 50px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:active {
    transform: scale(0.99);
  }
`;

const InfoToggleBtn = ({ placeInfoWrapper, mapContainer }) => {
  const dispatch = useDispatch();
  const [slider, setSlider] = useState(false);
  const { mapBox, roadMapBox } = useSelector(({ map, roadmap }) => ({
    mapBox: map.mapBox,
    roadMapBox: roadmap.roadmap,
  }));
  const { page } = useSelector(({ menupage }) => ({
    page: menupage.userpage || menupage.rvpage || menupage.reviewpage,
  }));
  const onSlideClick = (e) => {
    const mapWidth = mapBox.current?.style.width;
    const roadMapWidth = roadMapBox?.a.style.width;

    if (!slider) {
      // 넓게 보여진다.
      placeInfoWrapper.current.style.transform = "translateX(-100%)";
      if (mapBox?.current) {
        mapBox.current.style.width = mapWidth === "15rem" ? "15rem" : "100vw";
        roadMapBox.a.style.width = roadMapWidth === "15rem" ? "15rem" : "100vw";
      } else {
        page.current.style.position = "absolute";
        page.current.style.left = "0";
        page.current.style.width = "100vw";
      }
    } else {
      // 좁게 보여진다.
      placeInfoWrapper.current.style.transform = "";
      if (mapBox?.current) {
        mapBox.current.style.width = mapWidth === "15rem" ? "15rem" : "70vw";
        roadMapBox.a.style.width = roadMapWidth === "15rem" ? "15rem" : "70vw";
      } else {
        page.current.style.position = "";
        page.current.style.left = "";
        page.current.style.width = "70vw";
      }
    }
    mapContainer?.relayout();
    roadMapBox?.relayout();
    setSlider(!slider);
    dispatch(infoToggleClick());
  };

  return (
    <InfoToggleBtnBlock onClick={onSlideClick}>
      {slider ? (
        <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
      ) : (
        <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
      )}
    </InfoToggleBtnBlock>
  );
};

export default InfoToggleBtn;
