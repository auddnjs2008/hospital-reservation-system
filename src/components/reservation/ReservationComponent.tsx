import React, { useCallback } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IReservationComponent } from "../../../types";
import { rvchatbtn } from "../../modules/chat";
import { reservationPage } from "../../modules/menupage";
import Calender from "./Calender/Calender";
import DoctorComponent from "./DoctorComponent";

const ReservationComponentBlock = styled.div`
  padding: 1rem;
  position: absolute;
  background-color: #f5f6fa;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  height: 100%;
  h1 {
    margin-bottom: 2rem;
  }
  .rvHead {
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
  }
  button.chat {
    all: unset;
    position: absolute;
    top: 50px;
    right: 50px;
    border: 1px solid black;
    padding: 5px;
    border-radius: 7px;
    background-color: #485460;
    color: white;
    font-weight: 600;
    &:active {
      transform: scale(0.98);
    }
  }
`;

const ReservationComponent: React.FC<IReservationComponent> = ({
  hospitalName,
  hospitals,
}) => {
  const rvPage = useRef<HTMLDivElement>(null);
  const [doctor, setDoctor] = useState("");
  const [phone, setPhone] = useState("");
  const [chat, setChat] = useState(false);

  const dispatch = useDispatch();

  const onChatClick = () => {
    dispatch(rvchatbtn(hospitalName));
  };

  const findPhoneNumber = useCallback(() => {
    const index = hospitals.findIndex(
      (item) => item.place_name === hospitalName
    );
    setPhone(hospitals[index]?.phone);
  }, [hospitalName, hospitals]);

  useEffect(() => {
    dispatch(reservationPage(rvPage));
  }, [dispatch]);

  useEffect(() => {
    if (hospitalName) findPhoneNumber();
  }, [hospitalName, findPhoneNumber]);

  return (
    <ReservationComponentBlock ref={rvPage}>
      <h1 className="rvHead">{hospitalName} </h1>
      {chat && (
        <button onClick={onChatClick} className="chat">
          ????????????
        </button>
      )}
      <DoctorComponent
        doctor={doctor}
        hospitalName={hospitalName}
        setDoctor={setDoctor}
        setChat={setChat}
        phone={phone}
      />
      {doctor && <Calender doctor={doctor} hospitalName={hospitalName} />}
    </ReservationComponentBlock>
  );
};

export default ReservationComponent;
