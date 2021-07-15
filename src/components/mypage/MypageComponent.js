import React from "react";
import styled from "styled-components";
import userPool from "../../lib/awsconfig";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../modules/auth";
import { useRef } from "react";
import { useEffect } from "react";
import { userPage } from "../../modules/menupage";

const MypageComponentBlock = styled.div`
  width: 70vw;
  height: 100vh;
`;

const MypageComponent = ({ history }) => {
  const dispatch = useDispatch();
  const mypage = useRef();
  const onClick = () => {
    const cognitoUser = userPool.getCurrentUser();
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
      <button onClick={onClick}>로그아웃</button>
    </MypageComponentBlock>
  );
};

export default withRouter(MypageComponent);
