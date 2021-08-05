import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getDoctors, getDoctorTimes } from "../../lib/api/hospitalInfo";
import ManagerDoctors from "./ManagerDoctors";
import ManagerGraph from "./ManagerGraph";

const ManagerPageBlock = styled.div`
  display: flex;
`;

const ManagerPage = () => {
  const { hospital } = useSelector(({ auth }) => ({
    hospital: auth.auth.hospital,
  }));
  const [doctors, setDoctors] = useState([]);
  const [times, setTimes] = useState(null);
  const [graphData, setGraph] = useState(null);
  const [doctorIndex, setIndex] = useState(-1);
  const getApiDoctors = async () => {
    try {
      const result = await getDoctors(hospital);
      setDoctors(
        JSON.parse(result.data.body).Items.map((item) => item.doctorName)
      );
    } catch (e) {
      alert(`${e}`);
    }
  };

  const getApiTime = async (name) => {
    try {
      const result = await getDoctorTimes(hospital, name);
      return { [name]: JSON.parse(result.data.body).Items };
    } catch (e) {
      alert(`${e}`);
    }
  };

  const getTimes = async () => {
    let times = [];
    if (doctors.length) {
      for (let i = 0; i < doctors.length; i++) {
        const result = await getApiTime(doctors[i]);
        times.push(result);
      }
      setTimes(times);
    }
  };

  useEffect(() => {
    getApiDoctors();
  }, []);

  useEffect(() => {
    if (doctors) getTimes();
  }, [doctors]);

  return (
    <ManagerPageBlock>
      <h1>
        <FontAwesomeIcon icon={faUserTie}></FontAwesomeIcon>
        {hospital} Manager
      </h1>
      <ManagerDoctors
        times={times}
        doctors={doctors}
        doctorIndex={doctorIndex}
        setIndex={setIndex}
        setGraph={setGraph}
      ></ManagerDoctors>
      <ManagerGraph
        graphData={graphData}
        data={[
          {
            id: "japan",
            color: "hsl(12, 70%, 50%)",
            data: [
              {
                x: "09:00",
                y: 102,
              },
              {
                x: "09:30",
                y: 56,
              },
              {
                x: "10:00",
                y: 217,
              },
              {
                x: "10:30",
                y: 293,
              },
              {
                x: "11:00",
                y: 183,
              },
              {
                x: "11:30",
                y: 238,
              },
              {
                x: "13:00",
                y: 175,
              },
              {
                x: "13:30",
                y: 175,
              },
              {
                x: "14:00",
                y: 5,
              },
              {
                x: "14:30",
                y: 249,
              },
              {
                x: "15:00",
                y: 243,
              },
              {
                x: "15:30",
                y: 10,
              },
              {
                x: "16:00",
                y: 10,
              },
              {
                x: "16:30",
                y: 10,
              },
              {
                x: "17:00",
                y: 50,
              },
              {
                x: "17:30",
                y: 50,
              },
            ],
          },
        ]}
      ></ManagerGraph>
    </ManagerPageBlock>
  );
};

export default ManagerPage;
