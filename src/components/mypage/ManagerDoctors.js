import React, { useEffect } from "react";
import { useState } from "react";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import styled from "styled-components";

const ManagerDoctorsBlock = styled.div`
  width: 30rem;
  height: 30rem;

  background-color: white;
  display: grid;
  grid-template-columns: 50px 1fr;
`;
const DoctorBar = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  grid-auto-rows: 1fr;
  /* background-color: #363b3e; */
  color: white;
`;

const BarLI = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.color ? "#005666" : "#363b3e")};
`;

const RvBox = styled.ul`
  background-color: #363b3e;
  height: 100%;
  table-layout: fixed;

  header,
  li {
    height: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    &:not(:first-child):hover {
      background-color: white;
      div {
        color: black;
      }
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid black;
      font-size: 1rem;
      color: white;
    }
  }
  header {
    background-color: #005666;
    div {
      font-size: 1.3rem;
      font-weight: 500;
      color: black;
    }
  }
`;

const ManagerDoctors = ({
  times,
  doctors,
  doctorIndex,
  setIndex,
  setGraph,
}) => {
  const [timeArray, setTimeArray] = useState([]);
  const createNumber = (time) => {
    let aTime = time.time.split("");
    aTime.splice(2, 1);
    aTime.splice(4, 1);
    aTime.splice(6, 1);
    aTime = Number(aTime.join(""));
    return aTime;
  };

  const onDoctorClick = (e) => {
    setIndex(Number(e.currentTarget.id));
  };

  useEffect(() => {
    if (times) {
      let arr = [];
      times.forEach((item) => {
        let middle = Object.values(item)[0];
        arr = [...arr, ...middle];
      });
      arr.sort((a, b) => createNumber(a) - createNumber(b));
      setGraph(arr);
      setTimeArray(arr);
    }
  }, [times]);

  return (
    <ManagerDoctorsBlock>
      <DoctorBar>
        <BarLI key={0} color={-1 === doctorIndex} onClick={() => setIndex(-1)}>
          시간별
        </BarLI>
        {times?.map((item, index) => (
          <BarLI
            id={index}
            color={index === doctorIndex}
            key={index + 1}
            onClick={onDoctorClick}
          >
            {Object.keys(item)[0]}
          </BarLI>
        ))}
      </DoctorBar>
      <RvBox>
        <header>
          <div>예약자</div>
          <div>예약의사</div>
          <div>예약시간</div>
        </header>
        {doctorIndex === -1
          ? timeArray.map((item) => (
              <li>
                <div>{item.name}</div>
                <div>{item.doctorName}</div>
                <div>{item.time}</div>
              </li>
            ))
          : times[doctorIndex][doctors[doctorIndex]].map((item) => (
              <li>
                <div>{item.name}</div>

                <div>{item.doctorName}</div>

                <div>{item.time}</div>
              </li>
            ))}
      </RvBox>
    </ManagerDoctorsBlock>
  );
};

export default ManagerDoctors;
