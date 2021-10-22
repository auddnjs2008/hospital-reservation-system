import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { ICalenderHeader } from "../../../../types";
import pallet from "../../../lib/styles/pallet";

const CalenderHeaderBlock = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
  height: 10rem;
  background-color: ${pallet.green[0]};
  background-color: #485460;
  color: white;
  font-size: 21px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  .control {
    width: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
  }
  li:nth-child(1) {
    margin-top: 50px;
    font-size: 40px;
  }
  li:nth-child(2) {
    width: 230px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 15px;
    }
  }
`;

const CalenderHeader: React.FC<ICalenderHeader> = ({
  today,
  setYear,
  setMonth,
  mYear,
  mMonth,
}) => {
  let date = {
    year: today.getFullYear(),
    month: Number(today.getMonth()) + 1,
    date: today.getDate(),
  };

  const onRightClick = () => {
    if (mMonth !== 12) {
      setMonth((item) => item + 1);
    } else {
      setYear((item) => item + 1);
      setMonth(1);
    }
  };

  const onLeftClick = () => {
    if (mMonth !== 1) {
      setMonth((item) => item - 1);
    } else {
      setYear((item) => item - 1);
      setMonth(12);
    }
  };

  return (
    <CalenderHeaderBlock>
      <li>{`${mYear}-${Number(mMonth) > 9 ? mMonth : "0" + mMonth}`}</li>

      <li>
        <span>
          현재:
          {`${date.year}-${
            Number(date.month) > 9 ? date.month : "0" + date.month
          }-${Number(date.date) > 9 ? date.date : "0" + date.date}`}
        </span>
        <div className="control">
          <FontAwesomeIcon
            icon={faCaretLeft}
            onClick={onLeftClick}
            style={{ fontSize: "30px" }}
          ></FontAwesomeIcon>
          <span>이동</span>
          <FontAwesomeIcon
            icon={faCaretRight}
            onClick={onRightClick}
            style={{ fontSize: "30px" }}
          ></FontAwesomeIcon>
        </div>
      </li>
    </CalenderHeaderBlock>
  );
};

export default CalenderHeader;
