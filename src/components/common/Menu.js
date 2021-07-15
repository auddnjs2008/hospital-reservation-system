import React from "react";
import styled from "styled-components";
import pallet from "../../lib/styles/pallet";
import { faUser, faHospital } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";

const MenuBlock = styled.ul`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  li {
    &:hover {
      color: ${pallet.green[3]};
    }
  }
`;

const StyledLink = styled(Link)`
  color: ${(props) => (props.current ? pallet.green[3] : "")};
`;

const Menu = ({ location }) => {
  const { auth } = useSelector(({ auth }) => ({ auth: auth.auth }));

  return (
    <MenuBlock>
      <li>
        <StyledLink
          current={location.pathname === "/user"}
          to={auth.id ? "/user" : "/login"}
        >
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        </StyledLink>
      </li>
      <li>
        <StyledLink current={location.pathname === "/map"} to="/map">
          <FontAwesomeIcon icon={faMapMarked}></FontAwesomeIcon>
        </StyledLink>
      </li>
      <li>
        <StyledLink to="/">
          <FontAwesomeIcon icon={faHospital}></FontAwesomeIcon>
        </StyledLink>
      </li>
    </MenuBlock>
  );
};

export default withRouter(Menu);
