import React from "react";
import styled from "styled-components";
import pallet from "../../lib/styles/pallet";
import {
  faUser,
  faCalendarCheck,
  faHospital,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  return (
    <MenuBlock>
      <li>
        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
      </li>
      <li>
        <FontAwesomeIcon icon={faCalendarCheck}></FontAwesomeIcon>
      </li>
      <li>
        <FontAwesomeIcon icon={faHospital}></FontAwesomeIcon>
      </li>
    </MenuBlock>
  );
};

export default Menu;
