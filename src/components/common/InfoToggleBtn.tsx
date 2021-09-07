import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IInfoToggleBtn, IStore } from "../../../types";
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

const InfoToggleBtn: React.FC<IInfoToggleBtn> = ({
  placeInfoWrapper,
  mapContainer,
}) => {
  const dispatch = useDispatch();
  const [slider, setSlider] = useState(false);
  const { mapBox, roadMapBox, page } = useSelector(
    ({ map, roadmap, menupage }: IStore) => ({
      mapBox: map.mapBox,
      roadMapBox: roadmap.roadmap,
      page: menupage.userpage || menupage.rvpage || menupage.reviewpage,
    })
  );

  const onSlideClick = useCallback(
    (e) => {
      const mapWidth = mapBox?.current?.style.width;
      const roadMapWidth = roadMapBox?.a.style.width;

      if (!slider) {
        // 넓게 보여진다.
        if (placeInfoWrapper.current)
          placeInfoWrapper.current.style.transform = "translateX(-100%)";
        if (mapBox?.current) {
          mapBox.current.style.width = mapWidth === "315px" ? "315px" : "100%";
          roadMapBox.a.style.width =
            roadMapWidth === "315px" ? "315px" : "100%";
        } else {
          if (page && page.current) {
            page.current.style.position = "absolute";
            page.current.style.left = "0";
            page.current.style.width = "100%";
          }
        }
      } else {
        // 좁게 보여진다.
        if (placeInfoWrapper.current)
          placeInfoWrapper.current.style.transform = "";
        if (mapBox?.current) {
          mapBox.current.style.width = mapWidth === "315px" ? "315px" : "70%";
          roadMapBox.a.style.width = roadMapWidth === "315px" ? "315px" : "70%";
        } else {
          if (page && page.current) {
            page.current.style.position = "";
            page.current.style.left = "";
            page.current.style.width = "70%";
          }
        }
      }
      (mapContainer as any).relayout();
      roadMapBox?.relayout();
      setSlider(!slider);
      dispatch(infoToggleClick());
    },
    [page, mapBox, roadMapBox, placeInfoWrapper, mapContainer, slider, dispatch]
  );

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

export default React.memo(InfoToggleBtn);
