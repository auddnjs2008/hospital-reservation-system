import React, { useState } from "react";
import { useEffect } from "react";

import styled from "styled-components";
import { IDates } from "../../../../types";

const DateBlock = styled.ul`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 2rem);
  border: 1px solid black;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
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
  &.pastDay {
    color: #dcdde1;
  }
`;

const Dates: React.FC<IDates> = ({ mYear, mMonth, setDay, setTimeWindow }) => {
  const [datesArray, setArray] = useState<any>([]);

  const [lastDate, setLastDate] = useState(
    new Date(mYear, mMonth, 0).getDate()
  );
  const [lastMonthDate, setLastMonthDate] = useState(
    new Date(mYear, mMonth - 1, 0).getDate()
  );
  const [startDay, setStartDay] = useState(
    new Date(mYear, mMonth - 1, 1).getDay()
  );

  const onClick = (e: React.MouseEvent<HTMLUListElement>) => {
    if (e.target === e.currentTarget) return;
    if (
      (e.target as Element).className.includes("nowMonth") &&
      !(e.target as Element).className.includes("pastDay")
    ) {
      setDay(Number((e.target as HTMLElement).innerText));
      setTimeWindow(true);
    }
  };

  useEffect(() => {
    let testArray = [];
    const nowdate = Number(new Date().getDate());
    const nowMonth = Number(new Date().getMonth() + 1);
    const nowYear = Number(new Date().getFullYear());

    for (let i = startDay - 1; i >= 0; i--) {
      testArray.push({ name: "lastMonth pastDay", value: lastMonthDate - i });
    }
    for (let i = 0; i < lastDate; i++) {
      testArray.push({ name: "nowMonth", value: i + 1 });
      if (mYear < nowYear) {
        testArray[testArray.length - 1].name = "nowMonth pastDay";
        continue;
      } else if (mYear > nowYear) {
        continue;
      }

      if (mMonth <= nowMonth) {
        testArray[testArray.length - 1].name = "nowMonth pastDay";
        if (mMonth === nowMonth && i + 1 >= nowdate) {
          testArray[testArray.length - 1].name = "nowMonth";
        }
      }
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
      {datesArray.map((item: any, index: number) => (
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
