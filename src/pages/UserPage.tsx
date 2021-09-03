import * as React from "react";
import styled from "styled-components";
import PlaceInfoContainer from "../containers/PlaceInfoContainer";
import MypageContainer from "../containers/mypage/MypageContainer";
import { useSelector } from "react-redux";
import { IAuth } from "../../types";

const UserWrapper = styled.div`
  display: flex;
`;

interface IWrapper {
  auth: IAuth;
}

const UserPage = () => {
  const { manager } = useSelector(({ auth }: IWrapper) => ({
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
