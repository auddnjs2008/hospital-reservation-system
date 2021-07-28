import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { reservationPage } from "../../modules/menupage";
import Calender from "./Calender/Calender";
import DoctorComponent from "./DoctorComponent";

const ReservationComponentBlock = styled.div`
  h1 {
    border: 1px solid black;
  }
`;

const ReservationComponent = ({ hospitalName }) => {
  const rvPage = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reservationPage(rvPage));
  }, []);

  return (
    <ReservationComponentBlock ref={rvPage}>
      <h1>{hospitalName} </h1>
      <DoctorComponent hospitalName={hospitalName} />
      <Calender />
    </ReservationComponentBlock>
  );
};

export default ReservationComponent;
