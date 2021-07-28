import React, { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";

const SocketPageBlock = styled.div``;

const SocketPage = () => {
  const URL =
    "wss://lyqbg9gcnf.execute-api.ap-northeast-2.amazonaws.com/production/";
  const Socket = useRef();
  const Input = useRef();
  const onConnect = () => {
    Socket.current = new WebSocket(URL);
    Socket.current.addEventListener("open", () => alert("오픈되었어 친구들~"));

    Socket.current.addEventListener("close", () => alert("닫혔어 친구들~"));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Socket.current.send(JSON.stringify({ action: "echo" }));
    Socket.current.onmessage = (event) => console.log(event.data);
  };

  useEffect(() => {
    onConnect();
  }, []);

  return (
    <SocketPageBlock>
      <form onSubmit={onSubmit}>
        <input type="text" ref={Input} placeholder="메세지 써주세요" />
      </form>
    </SocketPageBlock>
  );
};

export default SocketPage;
