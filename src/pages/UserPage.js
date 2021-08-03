import React from "react";
import styled from "styled-components";
import PlaceInfoContainer from "../containers/PlaceInfoContainer";
import MypageContainer from "../containers/mypage/MypageContainer";

const UserWrapper = styled.div`
  display: flex;
`;

const UserPage = () => {
  return (
    <UserWrapper>
      <PlaceInfoContainer />
      <MypageContainer />
    </UserWrapper>
  );
};

export default UserPage;
