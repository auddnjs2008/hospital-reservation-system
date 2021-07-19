import React from "react";
import { useState } from "react";
import styled from "styled-components";

const MapControllerBlock = styled.ul`
  display: flex;

  position: absolute;
  top: 10px;
  right: 50px;

  z-index: 50;

  li {
    cursor: pointer;
    font-size: 50px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    div {
      background-color: #ecf0f1;
    }
  }
`;

const MapController = ({ map }) => {
  const [sky, setSky] = useState(false);

  const onSkyToggleClick = (e) => {
    if (!sky) {
      map.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
    } else {
      map.setMapTypeId(window.kakao.maps.MapTypeId.ROADMAP);
    }
    setSky((item) => !item);
  };
  return (
    <MapControllerBlock>
      <li onClick={onSkyToggleClick}>
        <div>🛫</div>
      </li>
      <li>
        <div>🚗</div>
      </li>
    </MapControllerBlock>
  );
};

export default MapController;
