import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IReserveData, IStore } from "../../../types";
import { getRecentPage, getReservations } from "../../lib/api/reservation";
import pallet from "../../lib/styles/pallet";

const UserMypageBlock = styled.div`
  background-color: #f5f6fa;
  width: 100%;
  min-height: 100%;
  padding: 1rem;
`;
const UserMenu = styled.ul`
  display: flex;
  margin-bottom: 3rem;
`;

const MenuList = styled.li<{ now: boolean }>`
  border: 1px solid black;
  border-radius: 1rem;

  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  background-color: ${(props) => (props.now ? pallet.green[1] : "white")};
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
    background-color: white;
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
      text-decoration: ${pallet.green[0]} underline 4.5px;
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

interface IUserMypage {
  setHospital: React.Dispatch<React.SetStateAction<string>>;
  setReview: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMypage: React.FC<IUserMypage> = ({ setHospital, setReview }) => {
  const { user } = useSelector(({ auth }: IStore) => ({ user: auth.auth.id }));
  const [pastPlanner, setPastPlanner] = useState<IReserveData[]>([]);
  const [nowPlanner, setNowPlanner] = useState<IReserveData[]>([]);
  const [recentPage, setRecent] = useState<string[]>([]);
  const [nowSwitch, setNow] = useState(0);

  const settingNow = (number: number) => () => setNow(number);

  const onPostReviewClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setReview(true);
    setHospital(e.currentTarget.id);
  };

  const makeObjectToArray = (obj: { [index: string]: string }) => {
    const Arr: string[] = Array(10).fill(0);
    for (let i = 1; i <= 10; i++) {
      Arr[i - 1] = obj[`view${i}`];
    }
    setRecent(Arr);
  };

  useEffect(() => {
    const getAxios = async () => {
      try {
        const result = await getReservations(user);
        const recent = await getRecentPage(user);
        const reservedata = JSON.parse(result.data.body).Items;
        const recentdata = JSON.parse(recent.data.body).Items;
        const Time = new Date();
        let presentRv: IReserveData[] = [];
        let pastRv: IReserveData[] = [];
        reservedata.forEach((item: IReserveData) => {
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
        if (recentdata[0]) makeObjectToArray(recentdata[0]);
      } catch (e) {
        alert(`${e}`);
      }
    };
    getAxios();
  }, [user]);

  return (
    <UserMypageBlock>
      <UserMenu>
        <MenuList now={nowSwitch === 0} onClick={settingNow(0)}>
          현재예약
        </MenuList>
        <MenuList now={nowSwitch === 1} onClick={settingNow(1)}>
          방문
        </MenuList>
        <MenuList now={nowSwitch === 2} onClick={settingNow(2)}>
          최근본 병원
        </MenuList>
      </UserMenu>
      <ReservationBox>
        {nowSwitch === 0 &&
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
        {nowSwitch === 1 &&
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
        {nowSwitch === 2 &&
          recentPage.map((item) =>
            item !== "Null" ? (
              <li>
                <div>{item}</div>
              </li>
            ) : (
              ""
            )
          )}
      </ReservationBox>
    </UserMypageBlock>
  );
};

export default UserMypage;
