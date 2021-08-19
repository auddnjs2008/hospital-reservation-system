import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { getDoctorTimes } from "../../../lib/api/hospitalInfo";
import CalenderHeader from "./CalenderHeader";
import Dates from "./Dates";
import DayLine from "./DayLine";
import SelectTime from "./SelectTime";

const CalenderBlock = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header``;

const Calender = ({ doctor, hospitalName }) => {
  let today = new Date();
  const [mYear, setYear] = useState(Number(today.getFullYear()));
  const [mMonth, setMonth] = useState(Number(today.getMonth()) + 1);
  const [mDay, setDay] = useState(null);
  const [plans, setPlans] = useState(null);
  const [timeWindow, setTimeWindow] = useState(false);

  useEffect(() => {
    const getTimesApi = async () => {
      try {
        const result = await getDoctorTimes(hospitalName, doctor);
        setPlans(JSON.parse(result.data.body).Items);
      } catch (e) {
        alert(`${e}`);
      }
    };
    getTimesApi();
  }, [doctor, hospitalName]);

  useEffect(() => {
    console.log(plans);
  }, [plans]);

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
      <Dates
        mYear={mYear}
        mMonth={mMonth}
        setDay={setDay}
        setTimeWindow={setTimeWindow}
      ></Dates>
      {timeWindow && (
        <SelectTime
          plans={plans}
          setPlans={setPlans}
          mDate={{ year: mYear, month: mMonth, day: mDay }}
          setTimeWindow={setTimeWindow}
          doctor={doctor}
          hospitalName={hospitalName}
        />
      )}
    </CalenderBlock>
  );
};

export default Calender;
