import React from "react";
import styled from "styled-components";
import pallet from "../../lib/styles/pallet";
import { faUser, faHospital } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import { IStore, Props } from "../../../types";

const MenuBlock = styled.ul`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  li {
    &:hover {
      color: ${pallet.green[0]};
    }
  }
`;

const StyledLink = styled(Link)<{ current: boolean }>`
  color: ${(props) => (props.current ? pallet.green[0] : "")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 1rem;
    margin-top: 5px;
  }
`;

const Menu = ({ location }: Props) => {
  const { auth } = useSelector(({ auth }: IStore) => ({
    auth: auth.auth,
  }));

  return (
    <MenuBlock>
      <li>
        <StyledLink
          current={location.pathname === "/user"}
          to={auth.id ? "/user" : "/login"}
        >
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          <span>내 화면</span>
        </StyledLink>
      </li>
      <li>
        <StyledLink current={location.pathname === "/map"} to="/map">
          <FontAwesomeIcon icon={faMapMarked}></FontAwesomeIcon>
          <span>병원지도</span>
        </StyledLink>
      </li>
      <li>
        <StyledLink current={location.pathname === "/"} to="/">
          <FontAwesomeIcon icon={faHospital}></FontAwesomeIcon>
          <span>키워드 검색</span>
        </StyledLink>
      </li>
    </MenuBlock>
  );
};

export default withRouter(Menu);
