import * as React from "react";
import styled from "styled-components";
import PlaceInfoContainer from "../containers/PlaceInfoContainer";
import ReservationContainer from "../containers/reservation/ReservationContainer";

const ReservationWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const ReservationPage = () => {
  return (
    <ReservationWrapper>
      <PlaceInfoContainer />
      <ReservationContainer />
    </ReservationWrapper>
  );
};

export default ReservationPage;
