import { faUserMd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { getDoctors } from "../../lib/api/hospitalInfo";

const DoctorComponentBlock = styled.ul`
  list-style: none;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-columns: 1fr;
  justify-items: center;
  padding: 5px;
  li {
    display: flex;
    align-items: center;
    box-shadow: 1px 1px 1px rgba(15, 15, 15, 0.3);
    width: 7rem;
    border-radius: 0.3rem;
    padding: 5px;
    background-color: #f2f3f4;
    cursor: pointer;
    &:active {
      transform: scale(0.99);
    }
  }
  .icon {
    font-size: 50px;
    color: gray;
  }
`;

const DoctorComponent = ({ hospitalName }) => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const getAxios = async () => {
      try {
        const result = await getDoctors(hospitalName);
        setDoctors(JSON.parse(result.data.body).Items);
      } catch (e) {
        alert(`${e}`);
      }
    };
    if (hospitalName) getAxios();
  }, [hospitalName]);

  return (
    <DoctorComponentBlock>
      {doctors &&
        doctors.map((item, index) => (
          <li key={index}>
            <FontAwesomeIcon className="icon" icon={faUserMd}></FontAwesomeIcon>
            <span>{item.doctorName}</span>
          </li>
        ))}
    </DoctorComponentBlock>
  );
};

export default DoctorComponent;
