import React from "react";
import styled from "styled-components";
import pallet from "../../lib/styles/pallet";
import {
  faUser,
  faCalendarCheck,
  faHospital,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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

const Menu = () => {
  const { auth } = useSelector(({ auth }) => ({ auth: auth.auth }));

  return (
    <MenuBlock>
      <li>
        <Link to={auth.email ? "" : "/login"}>
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        </Link>
      </li>
      <li>
        <Link>
          <FontAwesomeIcon icon={faCalendarCheck}></FontAwesomeIcon>
        </Link>
      </li>
      <li>
        <Link>
          <FontAwesomeIcon icon={faHospital}></FontAwesomeIcon>
        </Link>
      </li>
    </MenuBlock>
  );
};

export default Menu;
