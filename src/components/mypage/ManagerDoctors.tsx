import React, { useEffect } from "react";
import { useState } from "react";
import pallet from "src/lib/styles/pallet";
import styled from "styled-components";
import { IIndex, ITimes } from "../../../types";

const ManagerDoctorsBlock = styled.div<{ windowSize: number }>`
  width: ${(props) => (props.windowSize > 800 ? "30rem" : "")};
  height: 100%;
  padding: ${(props) => (props.windowSize > 800 ? "12px" : "50px")};
  background-color: #363b3e;
  display: grid;
  grid-template-columns: 50px 1fr;
`;
const DoctorBar = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;

  grid-auto-rows: 90px;
  /* background-color: #363b3e; */
  color: white;
`;

const BarLI = styled.li<{ now: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.now ? `${pallet.green[3]}` : "#363b3e"};
`;

const RvBox = styled.ul`
  background-color: #363b3e;
  height: 100%;
  overflow: auto;
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
    /* background-color: #005666; */

    background-color: ${pallet.green[3]};
    div {
      font-size: 1.3rem;
      font-weight: 500;
      color: black;
    }
  }
`;

interface IManagerDoctors {
  times: IIndex[];
  doctors: string[];
  doctorIndex: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setGraph: React.Dispatch<React.SetStateAction<any>>;
  windowSize: number;
}
const ManagerDoctors: React.FC<IManagerDoctors> = ({
  times,
  doctors,
  doctorIndex,
  setIndex,
  setGraph,
  windowSize,
}) => {
  const [timeArray, setTimeArray] = useState<any>([]);

  const createNumber = (time: any) => {
    let aTime = time.time.split("");
    aTime.splice(2, 1);
    aTime.splice(4, 1);
    aTime.splice(6, 1);
    aTime = Number(aTime.join(""));
    return aTime;
  };

  const onDoctorClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setIndex(Number(e.currentTarget.id));
  };

  useEffect(() => {
    if (times) {
      let arr: any[] = [];
      times.forEach((item) => {
        let middle = Object.values(item)[0];
        arr = [...arr, ...middle];
      });
      arr.sort((a, b) => createNumber(a) - createNumber(b));
      setGraph(arr);
      setTimeArray(arr);
    }
  }, [times, setGraph]);

  useEffect(() => {
    if (doctorIndex === -1) {
      setGraph(timeArray);
    } else {
      setGraph(times[doctorIndex][doctors[doctorIndex]]);
    }
  }, [doctorIndex, setGraph, times, doctors, timeArray]);

  return (
    <ManagerDoctorsBlock windowSize={windowSize}>
      <DoctorBar>
        <BarLI key={0} now={-1 === doctorIndex} onClick={() => setIndex(-1)}>
          시간별
        </BarLI>
        {times?.map((item, index) => (
          <BarLI
            id={JSON.stringify(index)}
            now={index === doctorIndex}
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
          ? timeArray.map((item: ITimes) => (
              <li>
                <div>{item.name}</div>
                <div>{item.doctorName}</div>
                <div>{item.time}</div>
              </li>
            ))
          : times[doctorIndex][doctors[doctorIndex]].map((item: ITimes) => (
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
