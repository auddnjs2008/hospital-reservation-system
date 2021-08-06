import { faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import pallet from "../../lib/styles/pallet";

const ChatComponentBlock = styled.div`
  position: absolute;
  bottom: 50%;
  right: 1.3rem;
  z-index: 100;
`;

const ChatButton = styled.button`
  all: unset;
  width: 3.7rem;
  height: 3.7rem;
  border-radius: 50%;
  border: 1.5px solid black;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  background-color: ${pallet.green[2]};
  &:active {
    transform: scale(0.98);
  }
`;
const ChatWrapper = styled.div`
  z-index: 100;
  width: 300px;
  height: 300px;
  background-color: red;
  @keyframes boxShow {
    0% {
      width: 0px;
      height: 0px;
    }
    100% {
      width: 300px;
      height: 300px;
    }
  }
  animation: boxShow 1s linear;
`;

const ChatComponent = () => {
  return (
    <ChatComponentBlock>
      <ChatButton>
        <FontAwesomeIcon icon={faComments}></FontAwesomeIcon>
      </ChatButton>
      <ChatWrapper></ChatWrapper>
    </ChatComponentBlock>
  );
};

export default ChatComponent;
