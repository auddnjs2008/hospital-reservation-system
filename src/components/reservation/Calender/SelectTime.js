import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getDoctorTimes } from "../../../lib/api/hospitalInfo";
import { postReservation } from "../../../lib/api/reservation";
import pallet from "../../../lib/styles/pallet";

const SelectTimeBlock = styled.ul`
  width: 40rem;
  height: 20rem;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 2px solid ${pallet.green[1]};

  li {
    display: grid;
    grid-template-columns: 10% 1fr;
    padding: 0 20px;

    .times {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
    }
    span {
      margin-left: 10px;
    }
    button {
      all: unset;
      color: black;
      padding: 5px;
      width: 2.5rem;
      display: flex;
      justify-content: center;
      border-radius: 5px;
      background-color: ${pallet.green[3]};
      &:active {
        transform: scale(0.98);
      }
    }
  }
  h1 {
    text-align: center;
    padding: 10px;
    font-size: 20px;
  }
  .closeBtn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 30px;
  }
`;

const ConfirmBox = styled.div`
  width: 100%;
  height: 80%;

  position: absolute;
  bottom: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  span {
    font-size: 20px;
    text-align: center;
    .time {
      font-size: 30px;
      font-weight: 600;
    }
  }
  div {
    width: 70%;
    display: flex;
    justify-content: space-between;
    button {
      all: unset;
      width: 10rem;
      height: 3rem;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      box-shadow: 0px 1px 3px rgba(15, 15, 15, 0.4);
      &:active {
        transform: scale(0.98);
      }
      &:hover {
        background-color: ${pallet.green[1]};
      }
    }
  }
`;
const TimeBox = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.show ? pallet.green[2] : "#d2dae2")};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.show ? pallet.green[3] : "")};
    color: ${(props) => (props.show ? "white" : "black")};
  }
`;
const SelectTime = ({
  plans,
  setPlans,
  mDate,
  setTimeWindow,
  doctor,
  hospitalName,
}) => {
  const { id } = useSelector(({ auth }) => ({ id: auth.auth.id }));
  const [btnShow, setBtnShow] = useState({
    "9:00": false,
    "9:30": false,
    "10:00": false,
    "10:30": false,
    "11:00": false,
    "11:30": false,
    "13:00": false,
    "13:30": false,
    "14:00": false,
    "14:30": false,
    "15:00": false,
    "15:30": false,
    "16:00": false,
    "16:30": false,
    "17:00": false,
    "17:30": false,
    "18:00": false,
  });
  const [time, setTime] = useState();
  const trimDates = useCallback(() => {
    const buttonData = {
      "09:00": false,
      "09:30": false,
      "10:00": false,
      "10:30": false,
      "11:00": false,
      "11:30": false,
      "13:00": false,
      "13:30": false,
      "14:00": false,
      "14:30": false,
      "15:00": false,
      "15:30": false,
      "16:00": false,
      "16:30": false,
      "17:00": false,
      "17:30": false,
      "18:00": false,
    };
    let trimPlans = plans?.map((item) => item.time);
    trimPlans = trimPlans
      ?.filter((item) =>
        item.includes(
          `${mDate.month < 10 ? "0" + mDate.month : mDate.month}/${
            mDate.day < 10 ? "0" + mDate.day : mDate.day
          }`
        )
      )
      .map((item) => item.split(" ")[1]);

    trimPlans?.forEach((item) => (buttonData[item] = true));
    setBtnShow(buttonData);
  }, [mDate, plans]);

  const onTimeClick = (e) => {
    if (e.target === e.currentTarget) return;
    if (e.target.className.includes("show")) setTime(e.target.innerText);
  };

  const onConfirmClick = async () => {
    if (mDate) {
      const date = `${mDate.month < 10 ? `0${mDate.month}` : mDate.month}/${
        mDate.day < 10 ? `0${mDate.day}` : mDate.day
      } ${time}`;

      try {
        await postReservation(hospitalName, date, id, doctor);
        alert("예약 완료되었습니다.");
        setTime("");
        setTimeWindow(false);
        const result = await getDoctorTimes(hospitalName, doctor);
        setPlans(JSON.parse(result.data.body).Items);
      } catch (e) {
        alert(`${e}`);
      }
    }
  };

  useEffect(() => {
    trimDates();
  }, [mDate, trimDates]);

  return (
    <SelectTimeBlock>
      <h1>
        {mDate.year}-{mDate.month}-{mDate.day}
      </h1>
      <li>
        <div>오전</div>
        <div className="times" onClick={onTimeClick}>
          <TimeBox
            className={!btnShow["09:00"] ? "show" : ""}
            show={!btnShow["09:00"]}
          >
            09:00
          </TimeBox>
          <TimeBox
            className={!btnShow["09:30"] ? "show" : ""}
            show={!btnShow["09:30"]}
          >
            09:30
          </TimeBox>
          <TimeBox
            className={!btnShow["10:00"] ? "show" : ""}
            show={!btnShow["10:00"]}
          >
            10:00
          </TimeBox>
          <TimeBox
            className={!btnShow["10:30"] ? "show" : ""}
            show={!btnShow["10:30"]}
          >
            10:30
          </TimeBox>
          <TimeBox
            className={!btnShow["11:00"] ? "show" : ""}
            show={!btnShow["11:00"]}
          >
            11:00{" "}
          </TimeBox>
          <TimeBox
            className={!btnShow["11:30"] ? "show" : ""}
            show={!btnShow["11:30"]}
          >
            11:30
          </TimeBox>
        </div>
      </li>
      <li>
        <div>오후</div>
        <div className="times" onClick={onTimeClick}>
          <TimeBox
            className={!btnShow["13:00"] ? "show" : ""}
            show={!btnShow["13:00"]}
          >
            13:00
          </TimeBox>
          <TimeBox
            className={!btnShow["13:30"] ? "show" : ""}
            show={!btnShow["13:30"]}
          >
            13:30
          </TimeBox>
          <TimeBox
            className={!btnShow["14:00"] ? "show" : ""}
            show={!btnShow["14:00"]}
          >
            14:00
          </TimeBox>
          <TimeBox
            className={!btnShow["14:30"] ? "show" : ""}
            show={!btnShow["14:30"]}
          >
            14:30
          </TimeBox>
          <TimeBox
            className={!btnShow["15:00"] ? "show" : ""}
            show={!btnShow["15:00"]}
          >
            15:00
          </TimeBox>
          <TimeBox
            className={!btnShow["15:30"] ? "show" : ""}
            show={!btnShow["15:30"]}
          >
            15:30
          </TimeBox>
          <TimeBox
            className={!btnShow["16:00"] ? "show" : ""}
            show={!btnShow["16:00"]}
          >
            16:00
          </TimeBox>
          <TimeBox
            className={!btnShow["16:30"] ? "show" : ""}
            show={!btnShow["16:30"]}
          >
            16:30
          </TimeBox>
          <TimeBox
            className={!btnShow["17:00"] ? "show" : ""}
            show={!btnShow["17:00"]}
          >
            17:00
          </TimeBox>
          <TimeBox
            className={!btnShow["17:30"] ? "show" : ""}
            show={!btnShow["17:30"]}
          >
            17:30
          </TimeBox>
        </div>
      </li>
      <span className="closeBtn" onClick={() => setTimeWindow(false)}>
        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
      </span>
      {time && (
        <ConfirmBox>
          <span>
            <span className="time">{time}</span> <br />
            <br /> 예약하시겠습니까?
          </span>
          <div>
            <button onClick={onConfirmClick}>확인</button>
            <button onClick={() => setTime()}>취소</button>
          </div>
        </ConfirmBox>
      )}
    </SelectTimeBlock>
  );
};

export default SelectTime;
