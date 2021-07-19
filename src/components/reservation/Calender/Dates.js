import React, { useState } from "react";
import { useEffect } from "react";

import styled from "styled-components";

const DateBlock = styled.ul`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  li.lastMonth,
  li.nextMonth {
    color: #dcdde1;
    cursor: unset;
  }
`;
const DateItem = styled.li`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 3px;
  background-color: #f5f6fa;
  border: 1px solid white;
  color: ${(props) => props.color || "black"};
  cursor: pointer;
`;

const Dates = ({ mYear, mMonth }) => {
  const [datesArray, setArray] = useState([]);
  const [rvdates, setRvDates] = useState([]);

  const [lastDate, setLastDate] = useState(
    new Date(mYear, mMonth, 0).getDate()
  );
  const [lastMonthDate, setLastMonthDate] = useState(
    new Date(mYear, mMonth - 1, 0).getDate()
  );
  const [startDay, setStartDay] = useState(
    new Date(mYear, mMonth - 1, 1).getDay()
  );

  useEffect(() => {
    let testArray = [];

    for (let i = startDay - 1; i >= 0; i--) {
      testArray.push({ name: "lastMonth", value: lastMonthDate - i });
    }
    for (let i = 0; i < lastDate; i++) {
      testArray.push({ name: "nowMonth", value: i + 1 });
    }

    for (let i = 0; i < 42 - lastDate; i++) {
      if (testArray.length === 42) break;
      testArray.push({ name: "nextMonth", value: i + 1 });
    }
    setArray(testArray);
  }, [lastDate, startDay, lastMonthDate]);

  useEffect(() => {
    setLastDate(new Date(mYear, mMonth, 0).getDate());
    setStartDay(new Date(mYear, mMonth - 1, 1).getDay());
    setLastMonthDate(new Date(mYear, mMonth - 1, 0).getDate());
  }, [mYear, mMonth]);

  useEffect(() => {
    //데이터 api 요청 추후 작업 필요
    setRvDates([1, 3, 8, 15, 20]);
  }, []);
  return (
    <DateBlock>
      {datesArray.map((item, index) => (
        <DateItem
          key={index}
          className={item.name}
          color={
            (index + 1) / 7 === Math.floor((index + 1) / 7)
              ? "blue"
              : index % 7 === 0
              ? "red"
              : ""
          }
        >
          {item.value}
        </DateItem>
      ))}
    </DateBlock>
  );
};

export default Dates;
