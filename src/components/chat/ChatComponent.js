import React from "react";
import styled from "styled-components";

const ChatComponentBlock = styled.div`
  position: absolute;
  bottom: 1.3rem;
  right: 1.3rem;
`;

const ChatWrapper = styled.div`
  width: 3.7rem;
  height: 3.7rem;
  border-radius: 50%;
  border: 1px solid black;
`;

const ChatComponent = () => {
  return (
    <ChatComponentBlock>
      <ChatWrapper></ChatWrapper>
    </ChatComponentBlock>
  );
};

export default ChatComponent;
