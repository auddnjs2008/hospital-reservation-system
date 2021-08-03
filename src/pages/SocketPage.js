import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const SocketPageBlock = styled.div``;

const SocketPage = () => {
  const { id } = useSelector(({ auth }) => ({ id: auth.auth.id }));
  const URL =
    "wss://fdm0nj6tt5.execute-api.ap-northeast-2.amazonaws.com/production";
  const Socket = useRef();
  const Input = useRef();
  const onConnect = () => {
    Socket.current = new WebSocket(URL);
    Socket.current.addEventListener("open", () => alert("오픈되었어 친구들~"));

    Socket.current.addEventListener("close", () => alert("닫혔어 친구들~"));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //{action:"setName", name : "bob"}  => 이름 지정
    //{action:"sendPrivate",message:"HEelo" ,to:"elice" }

    Socket.current.send(
      // JSON.stringify({
      //   method: "POST",
      //   body: {
      //     TableName: "comment",
      //     Item: {
      //       time: "21/07/30 19:30",
      //       userName: "미래의아마존",
      //       hospitalName: "숭실의원",
      //       comment: "Mola",
      //     },
      //   },
      // })
      // JSON.stringify({ action: "setName", name: id })
      JSON.stringify({
        action: "sendPrivate",
        message: Input.current.value,
        to: "alice",
      })
    );
    Socket.current.onmessage = (event) => console.log(JSON.parse(event.data));
  };

  useEffect(() => {
    onConnect();
    console.log(id);
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
