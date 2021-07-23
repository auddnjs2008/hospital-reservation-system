import React from "react";
import MapContainer from "../containers/map/MapContainer";
import PlaceInfoContainer from "../containers/PlaceInfoContainer";
import styled from "styled-components";

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const MapPage = () => {
  return (
    <>
      <MapWrapper>
        <PlaceInfoContainer />
        <MapContainer></MapContainer>
      </MapWrapper>
    </>
  );
};

export default MapPage;
