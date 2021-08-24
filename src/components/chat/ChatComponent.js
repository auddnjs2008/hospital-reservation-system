import { faComments } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faEnvelope,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getListPeople } from "../../lib/api/chat";
import pallet from "../../lib/styles/pallet";
import { allchatbtn, backchatbtn } from "../../modules/chat";
import ChatForm from "./ChatForm";

const ChatComponentBlock = styled.div`
  position: fixed;
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
  width: 22rem;
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
    height: 90%;

    box-shadow: 0px 0px 10px rgba(15, 15, 15, 0.3);
  }
`;

const Controller = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 20%;
`;

const OnLineRight = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => (props.online ? "green" : "red")};
`;

const ChatterList = styled.ul`
  font-size: 2rem;
  background-color: ${pallet.green[3]};
  height: 100%;
  overflow: auto;
  padding: 3px;
  li {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    justify-items: center;
    margin-bottom: 10px;
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: white;
      span.isRead {
        color: black;
      }
    }
    span.isRead {
      color: #dff9fb;
    }
    span.avatar {
      justify-self: start;
    }
    span.id {
      justify-self: end;
    }
  }
  span {
    font-size: 1.5rem;
  }
`;

const ChatComponent = ({ dispatch, chatRvName, chatShow, id }) => {
  const [chatBox, setChat] = useState(false);
  const [chatPersons, setPersons] = useState([]);
  const [oneChater, setChater] = useState("");
  const [inChat, setInChat] = useState(false);
  const { chaterId } = useSelector(({ chat }) => ({
    chaterId: chat.id,
    hospital: chat.name,
  }));
  const webSocket = useRef();

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
    setChater("");
    if (webSocket.current) webSocket.current.close();
    dispatch(allchatbtn());
  };

  useEffect(() => {
    console.log(chatPersons);
  }, [chatPersons]);
  return (
    <ChatComponentBlock>
      <ChatButton onClick={onOpenBtn}>
        <FontAwesomeIcon icon={faComments}></FontAwesomeIcon>
      </ChatButton>
      {chatBox && (
        <ChatWrapper>
          <header>
            {oneChater || chaterId ? (
              <Controller>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  onClick={() => {
                    setChater("");
                    setChat(true);
                    getChatUsers();
                    if (chaterId) dispatch(backchatbtn());
                    webSocket.current.close();
                  }}
                ></FontAwesomeIcon>
                <OnLineRight online={inChat}></OnLineRight>
              </Controller>
            ) : (
              ""
            )}
          </header>
          <main>
            {oneChater || chaterId ? (
              <ChatForm
                id={id}
                oneChater={oneChater ? oneChater : chaterId}
                setChater={setChater}
                setInChat={setInChat}
                webSocket={webSocket}
              ></ChatForm>
            ) : (
              <ChatterList>
                {chatPersons.length &&
                  chatPersons.map((item, index) => (
                    <li key={index} onClick={() => setChater(item[1][1])}>
                      <span className="avatar">
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                      </span>
                      <span className="isRead">
                        {item[1][0] === "YES" || item[1][0] === "1" ? (
                          ""
                        ) : (
                          <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                        )}
                      </span>
                      <span className="id">{item[0]}</span>
                    </li>
                  ))}
              </ChatterList>
            )}
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
