import React from "react";
import styled from "styled-components";
import PlaceInfoContainer from "../containers/PlaceInfoContainer";
import MypageContainer from "../containers/mypage/MypageContainer";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UserWrapper = styled.div`
  display: flex;
`;

const UserPage = () => {
  const { manager } = useSelector(({ auth }) => ({
    manager: auth.auth.manager,
  }));

  return (
    <UserWrapper>
      {!manager && <PlaceInfoContainer />}
      <MypageContainer manager={manager} />
    </UserWrapper>
  );
};

export default UserPage;
