import React from "react";
import styled from "styled-components";

import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../modules/auth";
import { useRef } from "react";
import { useEffect } from "react";
import { userPage } from "../../modules/menupage";
import { Auth } from "aws-amplify";
import UserMypage from "./UserMypage";
import ReviewWrite from "../review/ReviewWrite";
import { useState } from "react";
import ManagerPage from "./ManagerPage";
import { Props } from "../../../types";
import pallet from "src/lib/styles/pallet";

const MypageComponentBlock = styled.div<{ manager: boolean }>`
  width: ${(props) => (props.manager ? "100vw" : "70vw")};
  height: 100vh;
  position: absolute;
  right: 0;
  .logOut {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: ${pallet.green[1]};
    span {
      margin-right: 20px;
      font-size: 20px;
      font-weight: 700;
      color: white;
    }
    button {
      all: unset;
      margin-right: 2rem;
      width: 5rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 20px;
      font-weight: 600;
      &:active {
        transform: scale(0.98);
      }
    }
  }
`;

interface IMypageComponent {
  manager: boolean;
  id: string;
}

const MypageComponent: React.FC<IMypageComponent & Props> = ({
  history,
  manager,
  id,
}) => {
  const dispatch = useDispatch();
  const mypage = useRef<HTMLDivElement>(null);
  const [hospital, setHospital] = useState("");
  const [review, setReview] = useState(false);
  const [scroll, setScroll] = useState(window.scrollY);

  const onClick = async () => {
    let cognitoUser = null;
    await Auth.currentAuthenticatedUser()
      .then((user) => (cognitoUser = user))
      .catch((err) => alert(`${err}`));
    if (cognitoUser !== null) {
      (cognitoUser as any).signOut();
      dispatch(logout());
      manager ? history.push("/login") : history.push("/map");
    }
  };
  useEffect(() => {
    dispatch(userPage(mypage));
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", () => setScroll(window.scrollY));
    return () =>
      window.removeEventListener("scroll", () => setScroll(window.scrollY));
  }, []);

  return (
    <MypageComponentBlock manager={manager} ref={mypage}>
      <div className="logOut">
        <span>{id}님</span>
        <button onClick={onClick}>로그아웃</button>
      </div>
      {!manager ? (
        <UserMypage setReview={setReview} setHospital={setHospital} />
      ) : (
        <ManagerPage></ManagerPage>
      )}
      {review && (
        <ReviewWrite
          scroll={scroll}
          hospital={hospital}
          setReview={setReview}
          rvPage={null}
          setReload={null}
        />
      )}
    </MypageComponentBlock>
  );
};

export default withRouter(MypageComponent);
