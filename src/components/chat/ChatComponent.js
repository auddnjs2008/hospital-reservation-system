import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { getListPeople } from "../../lib/api/chat";
import pallet from "../../lib/styles/pallet";
import { allchatbtn } from "../../modules/chat";

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
  z-index: 200;
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
  position: absolute;
  padding: 10px;
  top: -20vh;
  right: 0;
  width: 20rem;
  height: 80vh;
  border-radius: 0.5rem;
  box-shadow: 0px 1px 20px rgba(15, 15, 15, 0.15);
  background-color: #f2f3f1;
  @keyframes chatBox {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: chatBox 0.2s ease-in-out forwards;
  button {
    all: unset;
    font-size: 1.5rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  header {
    /* border: 1px solid red; */
    height: 3rem;
  }
  main {
    height: 80%;
    overflow: auto;
    box-shadow: 0px 0px 10px rgba(15, 15, 15, 0.3);
    ul {
      font-size: 2rem;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 5px;
        cursor: pointer;
        &:hover {
          background-color: white;
        }
      }
      span {
        font-size: 1.5rem;
      }
    }
  }
`;

const ChatComponent = ({ dispatch, chatRvName, chatShow, id }) => {
  const [chatBox, setChat] = useState(false);
  const [chatPersons, setPersons] = useState([]);
  const [oneChater, setChater] = useState("");

  useEffect(() => {
    setChat(chatShow);
  }, [chatShow]);

  const getChatUsers = async () => {
    try {
      const result = await getListPeople(id);
      setPersons(result.data);
    } catch (e) {
      alert(`${e}`);
    }
  };
  const onOpenBtn = () => {
    setChat(true);
    dispatch(allchatbtn());
    getChatUsers();
  };
  const onCloseBtn = () => {
    setChat(false);
    dispatch(allchatbtn());
  };

  return (
    <ChatComponentBlock>
      <ChatButton onClick={onOpenBtn}>
        <FontAwesomeIcon icon={faComments}></FontAwesomeIcon>
      </ChatButton>
      {chatBox && (
        <ChatWrapper>
          <header></header>
          <main>
            <ul>
              {chatPersons.length &&
                chatPersons.map((item, index) => (
                  <li key={index} onClick={() => setChater(item)}>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </main>
          <button>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={onCloseBtn}
            ></FontAwesomeIcon>
          </button>
        </ChatWrapper>
      )}
    </ChatComponentBlock>
  );
};

export default ChatComponent;
