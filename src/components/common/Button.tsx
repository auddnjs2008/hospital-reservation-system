import React from "react";
import styled from "styled-components";
import { IButton } from "../../../types";
import pallet from "../../lib/styles/pallet";
const ButtonBlock = styled.button`
  all: unset;
  background-color: ${pallet.green[0]};
  text-align: center;
  width: 100%;
  min-height: 2.3rem;
  height: 2.5rem;
  color: black;
  font-weight: 700;
  &:hover {
    background-color: ${pallet.green[1]};
  }
`;

const Button: React.FC<IButton> = ({ content }) => {
  return <ButtonBlock>{content || "버튼"}</ButtonBlock>;
};

export default Button;
