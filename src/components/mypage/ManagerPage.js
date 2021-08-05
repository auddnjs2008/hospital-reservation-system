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
  height: 90%;
`;

const UserProfile = styled.h1`
  background-color: #363b3e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div.icon {
    font-size: 5rem;
    text-align: center;
    border-radius: 50%;
  }
  div.name {
    margin-top: 10px;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    color: white;
  }
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
      <UserProfile>
        <div className="icon">
          <FontAwesomeIcon icon={faUserTie}></FontAwesomeIcon>
        </div>
        <div className="name">{hospital} Manager</div>
      </UserProfile>
      <ManagerDoctors
        times={times}
        doctors={doctors}
        doctorIndex={doctorIndex}
        setIndex={setIndex}
        setGraph={setGraph}
      ></ManagerDoctors>
      <ManagerGraph
        graphData={graphData}
        doctorIndex={doctorIndex}
        doctors={doctors}
      ></ManagerGraph>
    </ManagerPageBlock>
  );
};

export default ManagerPage;
