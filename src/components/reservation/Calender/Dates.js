import React, { useState } from "react";
import { useEffect } from "react";

import styled from "styled-components";

const DateBlock = styled.ul`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 2rem);

  li.lastMonth,
  li.nextMonth {
    color: #dcdde1;
    cursor: unset;
  }
`;
const DateItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  /* background-color: #f5f6fa; */
  border: 1px solid white;
  color: ${(props) => props.color || "black"};
  cursor: pointer;
`;

const Dates = ({ mYear, mMonth, setDay, setTimeWindow }) => {
  const [datesArray, setArray] = useState([]);

  const [lastDate, setLastDate] = useState(
    new Date(mYear, mMonth, 0).getDate()
  );
  const [lastMonthDate, setLastMonthDate] = useState(
    new Date(mYear, mMonth - 1, 0).getDate()
  );
  const [startDay, setStartDay] = useState(
    new Date(mYear, mMonth - 1, 1).getDay()
  );

  const onClick = (e) => {
    if (e.target === e.currentTarget) return;
    if (e.target.className.includes("nowMonth")) {
      setDay(e.target.innerText);
      setTimeWindow(true);
    }
  };

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

  return (
    <DateBlock onClick={onClick}>
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
