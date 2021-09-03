import React from "react";
import MapContainer from "../containers/map/MapContainer";
import PlaceInfoContainer from "../containers/PlaceInfoContainer";
import styled from "styled-components";

const MapWrapper = styled.div`
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
