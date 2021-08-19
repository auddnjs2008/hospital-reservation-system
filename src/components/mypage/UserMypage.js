import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getReservations } from "../../lib/api/reservation";
import pallet from "../../lib/styles/pallet";

const UserMypageBlock = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  margin-top: 20px;
  padding: 1rem;
`;
const UserMenu = styled.ul`
  display: flex;
  margin-bottom: 3rem;
`;

const MenuList = styled.li`
  border: 1px solid black;
  border-radius: 1rem;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  background-color: ${(props) => (props.color ? pallet.green[1] : "white")};
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const ReservationBox = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  li {
    width: 30rem;
    height: 9rem;
    min-width: 300px;

    border-radius: 12px;
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 5%), inset 0px 0px 5px rgb(0 0 0/ 30%);
    padding: 20px;
    margin-bottom: 1rem;
    display: grid;
    grid-template-rows: 2fr 1fr;
    align-items: center;

    .planTitle {
      border-bottom: 1px solid rgba(11, 11, 11, 0.1);
      align-self: start;

      height: 100%;
      span {
        font-size: 0.9rem;
      }
    }
    h1 {
      margin-bottom: 1rem;
      font-size: 20px;
      font-weight: 600;
      text-decoration: ${pallet.green[3]} underline 4.5px;
    }
    .doctorName {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 1.3rem;
        font-weight: 500;
      }
    }
    button {
      all: unset;
      border: 1px solid black;
      border-radius: 0.9rem;
      font-size: 0.9rem;
      padding: 5px;
      background-color: ${pallet.green[0]};
      &:active {
        transform: scale(0.98);
      }
    }
  }
`;

const UserMypage = ({ setHospital, setReview }) => {
  const { user } = useSelector(({ auth }) => ({ user: auth.auth.id }));
  const [pastPlanner, setPastPlanner] = useState(null);
  const [nowPlanner, setNowPlanner] = useState(null);
  const [nowSwitch, setNow] = useState(true);

  const onPostReviewClick = (e, name) => {
    setReview(true);
    setHospital(e.currentTarget.id);
  };

  useEffect(() => {
    const getAxios = async () => {
      try {
        const result = await getReservations(user);
        const data = JSON.parse(result.data.body).Items;
        const Time = new Date();
        let presentRv = [];
        let pastRv = [];
        data.forEach((item) => {
          const month = Number(item.time.split(" ")[0].split("/")[0]);
          const day = Number(item.time.split(" ")[0].split("/")[1]);
          if (month < Time.getMonth() + 1) {
            pastRv.push(item);
          } else if (month === Time.getMonth() + 1) {
            if (day < Time.getDate()) pastRv.push(item);
            else presentRv.push(item);
          } else {
            presentRv.push(item);
          }
        });
        setPastPlanner(pastRv);
        setNowPlanner(presentRv);
      } catch (e) {
        alert(`${e}`);
      }
    };
    getAxios();
  }, [user]);

  return (
    <UserMypageBlock>
      <UserMenu>
        <MenuList color={nowSwitch} onClick={() => setNow(true)}>
          현재예약
        </MenuList>
        <MenuList color={!nowSwitch} onClick={() => setNow(false)}>
          방문
        </MenuList>
      </UserMenu>
      <ReservationBox>
        {nowSwitch &&
          nowPlanner?.map((item) => (
            <li>
              <div className="planTitle">
                <h1>{item.hospitalName}</h1>
                <span>{item.time}</span>
              </div>
              <div className="doctorName">
                <span>{item.doctorName} 의사 </span>
              </div>
            </li>
          ))}
        {!nowSwitch &&
          pastPlanner?.map((item) => (
            <li>
              <div className="planTitle">
                <h1>{item.hospitalName}</h1>
                <span>{item.time}</span>
              </div>
              <div className="doctorName">
                <span>{item.doctorName} 의사</span>
                <button id={item.hospitalName} onClick={onPostReviewClick}>
                  후기쓰기
                </button>
              </div>
            </li>
          ))}
      </ReservationBox>
    </UserMypageBlock>
  );
};

export default UserMypage;
