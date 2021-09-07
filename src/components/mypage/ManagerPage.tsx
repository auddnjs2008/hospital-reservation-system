import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IIndex, IStore } from "../../../types";
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
  const { hospital } = useSelector(({ auth }: IStore) => ({
    hospital: auth.auth.hospital,
  }));
  const [doctors, setDoctors] = useState([]);
  const [times, setTimes] = useState<IIndex[]>([]);
  const [graphData, setGraph] = useState(null);
  const [doctorIndex, setIndex] = useState(-1);

  const getApiDoctors = useCallback(async () => {
    try {
      const result = await getDoctors(hospital);
      setDoctors(
        JSON.parse(result.data.body).Items.map((item: any) => item.doctorName)
      );
    } catch (e) {
      alert(`${e}`);
    }
  }, [hospital]);

  const getApiTime = useCallback(
    async (name) => {
      try {
        const result = await getDoctorTimes(hospital, name);
        return { [name]: JSON.parse(result.data.body).Items };
      } catch (e) {
        alert(`${e}`);
      }
    },
    [hospital]
  );

  const getTimes = useCallback(async () => {
    let times: IIndex[] = [];
    if (doctors.length) {
      for (let i = 0; i < doctors.length; i++) {
        const result = await getApiTime(doctors[i]);
        if (result) times.push(result);
      }
      setTimes(times);
    }
  }, [doctors, getApiTime]);

  useEffect(() => {
    getApiDoctors();
  }, [getApiDoctors]);

  useEffect(() => {
    if (doctors) getTimes();
  }, [doctors, getTimes]);

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
