import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { reservationPage } from "../../modules/menupage";
import Calender from "./Calender/Calender";
import DoctorComponent from "./DoctorComponent";

const ReservationComponentBlock = styled.div`
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .rvHead {
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
  }
`;

const ReservationComponent = ({ hospitalName }) => {
  const rvPage = useRef();
  const [doctor, setDoctor] = useState("");
  const [phone, setPhone] = useState("");
  const { hospitals } = useSelector(({ map }) => ({
    hospitals: map.hospitals,
  }));
  const dispatch = useDispatch();

  const findPhoneNumber = () => {
    const index = hospitals.findIndex(
      (item) => item.place_name === hospitalName
    );

    setPhone(hospitals[index].phone);
  };

  useEffect(() => {
    dispatch(reservationPage(rvPage));
  }, []);

  useEffect(() => {
    if (hospitalName) findPhoneNumber();
  }, [hospitalName]);

  return (
    <ReservationComponentBlock ref={rvPage}>
      <h1 className="rvHead">{hospitalName} </h1>
      {/* {doctor.length ? (
        <DoctorComponent
          doctor={doctor}
          hospitalName={hospitalName}
          setDoctor={setDoctor}
        />
      ) : (
        <h1>{phone}</h1>
      )} */}
      <DoctorComponent
        doctor={doctor}
        hospitalName={hospitalName}
        setDoctor={setDoctor}
        phone={phone}
      />
      {doctor && <Calender doctor={doctor} hospitalName={hospitalName} />}
    </ReservationComponentBlock>
  );
};

export default ReservationComponent;
