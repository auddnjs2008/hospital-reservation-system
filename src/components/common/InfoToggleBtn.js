import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

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
  const [slider, setSlider] = useState(false);
  const { mapBox } = useSelector(({ map }) => ({ mapBox: map.mapBox }));
  const { page } = useSelector(({ menupage }) => ({
    page: menupage.userpage || menupage.rvpage,
  }));
  const onSlideClick = (e) => {
    if (!slider) {
      placeInfoWrapper.current.style.transform = "translateX(-100%)";
      if (mapBox?.current) {
        mapBox.current.style.position = "absolute";
        mapBox.current.style.left = "0";
        mapBox.current.style.width = "100vw";
      } else {
        page.current.style.position = "absolute";
        page.current.style.left = "0";
        page.current.style.width = "100vw";
      }
    } else {
      placeInfoWrapper.current.style.transform = "";
      if (mapBox?.current) {
        mapBox.current.style.position = "block";
        mapBox.current.style.left = "";
        mapBox.current.style.width = "70vw";
      } else {
        page.current.style.position = "";
        page.current.style.left = "";
        page.current.style.width = "70vw";
      }
    }
    mapContainer?.relayout();
    setSlider(!slider);
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
