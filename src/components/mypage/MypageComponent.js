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
import pallet from "../../lib/styles/pallet";
import ReviewWrite from "./ReviewWrite";
import { useState } from "react";

const MypageComponentBlock = styled.div`
  width: 70vw;
  height: 100vh;
  position: relative;
  background-color: #07b495;
  .logOut {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: flex-end;
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

const MypageComponent = ({ history }) => {
  const dispatch = useDispatch();
  const mypage = useRef();
  const [hospital, setHospital] = useState("");
  const [review, setReview] = useState(false);

  const onClick = async () => {
    let cognitoUser = null;
    await Auth.currentAuthenticatedUser()
      .then((user) => (cognitoUser = user))
      .catch((err) => alert(`${err}`));
    if (cognitoUser !== null) {
      cognitoUser.signOut();
      dispatch(logout());
      history.push("/map");
    }
  };
  useEffect(() => {
    dispatch(userPage(mypage));
  }, [dispatch]);

  return (
    <MypageComponentBlock ref={mypage}>
      <div className="logOut">
        <button onClick={onClick}>로그아웃</button>
      </div>
      <UserMypage setReview={setReview} setHospital={setHospital} />
      {review && <ReviewWrite hospital={hospital} setReview={setReview} />}
    </MypageComponentBlock>
  );
};

export default withRouter(MypageComponent);
