import { faUserMd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
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
  .icon {
    font-size: 50px;
    color: gray;
  }
  h1 {
    font-size: 2rem;
    margin-top: 5rem;
    width: 100%;
    border: 1px solid black;
  }
`;

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 1px rgba(15, 15, 15, 0.3);
  width: 7rem;
  border-radius: 0.3rem;
  padding: 5px;
  background-color: ${(props) => (props.isColor ? "#485460" : "#f2f3f4")};
  color: ${(props) => (props.isColor ? "white" : "black")};
  cursor: pointer;
  &:active {
    transform: scale(0.99);
  }
`;

const DoctorComponent = ({ doctor, hospitalName, setDoctor, phone }) => {
  const [doctors, setDoctors] = useState([]);
  const [clickIndex, setClick] = useState(-1);

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

  const onDoctorClick = (e) => {
    setDoctor(e.currentTarget.innerText);
  };
  useEffect(() => {
    if (doctors) {
      setClick(doctors.findIndex((item) => item.doctorName === doctor));
    }
  }, [doctor]);

  return (
    <DoctorComponentBlock>
      {doctors.length ? (
        doctors.map((item, index) => (
          <StyledLi
            key={index}
            onClick={onDoctorClick}
            isColor={clickIndex === index}
          >
            <FontAwesomeIcon className="icon" icon={faUserMd}></FontAwesomeIcon>
            <span>{item.doctorName}</span>
          </StyledLi>
        ))
      ) : (
        <h1>{phone}</h1>
      )}
    </DoctorComponentBlock>
  );
};

export default DoctorComponent;
