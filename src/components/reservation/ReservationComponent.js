import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { reservationPage } from "../../modules/menupage";
import Calender from "./Calender/Calender";

const ReservationComponentBlock = styled.div``;

const ReservationComponent = () => {
  const rvPage = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reservationPage(rvPage));
  }, []);
  return (
    <ReservationComponentBlock ref={rvPage}>
      <div>예약페이지야 </div>
      <Calender />
    </ReservationComponentBlock>
  );
};

export default ReservationComponent;
