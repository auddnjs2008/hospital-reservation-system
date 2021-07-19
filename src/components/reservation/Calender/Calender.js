import React, { useState } from "react";
import styled from "styled-components";
import CalenderHeader from "./CalenderHeader";
import Dates from "./Dates";
import DayLine from "./DayLine";

const CalenderBlock = styled.div`
  width: 600px;
  height: 500px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header``;

const Calender = () => {
  let today = new Date();
  const [mYear, setYear] = useState(Number(today.getFullYear()));
  const [mMonth, setMonth] = useState(Number(today.getMonth()) + 1);

  return (
    <CalenderBlock>
      <Header>
        <CalenderHeader
          today={today}
          setYear={setYear}
          setMonth={setMonth}
          mYear={mYear}
          mMonth={mMonth}
        />
        <DayLine />
      </Header>
      <Dates mYear={mYear} mMonth={mMonth}></Dates>
    </CalenderBlock>
  );
};

export default Calender;
