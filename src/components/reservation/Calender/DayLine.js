import React from "react";
import styled from "styled-components";
import pallet from "../../../lib/styles/pallet";

const DayLineBlock = styled.ul`
  height: 30px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  align-items: center;
  column-gap: 1px;
  font-size: 18px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  /* background-color: ${pallet.black[5]}; */
  li {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: ${pallet.green[2]}; */
    &:first-child {
      color: red;
    }
  }
`;

const DayLine = () => {
  return (
    <DayLineBlock>
      <li>일</li>
      <li>월</li>
      <li>화</li>
      <li>수</li>
      <li>목</li>
      <li>금</li>
      <li>토</li>
    </DayLineBlock>
  );
};

export default DayLine;
