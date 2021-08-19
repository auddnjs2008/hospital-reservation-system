import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { getPrevChats } from "../../lib/api/chat";
import pallet from "../../lib/styles/pallet";

const ChatFormBlock = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 50px;
  ul {
    border: 1px solid black;
    background-color: ${pallet.green[3]};
    padding: 5px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    li {
      margin-bottom: 1rem;
      span.time {
        font-size: 0.7rem;
        font-weight: 600;
        margin-top: 10px;
      }
      div.infoBox {
        display: flex;
        margin-bottom: 5px;
      }
      div.message {
        font-size: 1rem;
        border: 1px solid black;
        padding: 5px;
        border-radius: 10px;
        background-color: white;
      }
      div.profile {
        all: unset;
        width: 33px;
        height: 33px;
        font-size: 0.8rem;
        border-radius: 50%;
        background-color: ${pallet.black[5]};
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }
    }
    li.me {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      div {
        margin-left: 5px;
        border-bottom-right-radius: 0;
      }
    }
    li.opponent {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      div {
        border-bottom-left-radius: 0;
        margin-right: 5px;
      }
      div.profile {
        border-bottom-left-radius: 50%;
      }
    }
  }
  form {
    display: flex;
    input[type="text"] {
      width: 80%;
      border: none;
      outline: none;
      font-size: 1rem;
      padding: 5px;
    }
    input[type="submit"] {
      flex: 1;
      border: none;
      outline: none;
      background-color: ${pallet.green[0]};
      font-size: 1rem;
      &:active {
        transform: scale(0.9);
      }
    }
    input {
      height: 100%;
    }
  }
`;

const ChatForm = ({ id, oneChater, setChater, webSocket, setInChat }) => {
  const [prevChats, setPrevChats] = useState([]);
  const chatBox = useRef();

  const ChatWrite = (text, who, name) => {
    const li = document.createElement("li");
    const infoDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    const textDiv = document.createElement("div");
    const timeSpan = document.createElement("span");
    const date = new Date();
    nameDiv.innerText = name;
    textDiv.innerText = text;
    timeSpan.innerText = `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;
    timeSpan.className = "time";
    nameDiv.className = "profile";
    infoDiv.className = "infoBox";
    textDiv.className = "message";

    if (who === "me") {
      li.className = "me";
      infoDiv.appendChild(timeSpan);
      li.appendChild(infoDiv);
      li.appendChild(textDiv);
    } else {
      li.className = "opponent";
      infoDiv.appendChild(nameDiv);
      infoDiv.appendChild(timeSpan);
      li.appendChild(infoDiv);
      li.appendChild(textDiv);
    }
    chatBox.current.appendChild(li);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // 내가 채팅칠때
    ChatWrite(e.currentTarget.firstChild.value, "me");
    chatBox.current.scrollTop = chatBox.current.scrollHeight;

    webSocket.current.send(
      JSON.stringify({
        action: "sendPrivate",
        message: e.currentTarget.firstChild.value,
        to: oneChater,
      })
    );
    e.currentTarget.firstChild.value = "";
  };

  const sortFunc = (a, b) => {
    let aDate = a.time.split(" ")[0].split("/");
    let bDate = b.time.split(" ")[0].split("/");

    aDate = aDate
      .map((item) => (Number(item) < 10 ? "0" + item : item))
      .join("");
    bDate = bDate
      .map((item) => (Number(item) < 10 ? "0" + item : item))
      .join("");

    if (Number(aDate) > Number(bDate)) return 1;
    else if (Number(aDate) < Number(bDate)) return -1;
    else {
      let aTime = a.time.split(" ")[1].split(":");
      let bTime = b.time.split(" ")[1].split(":");
      aTime = aTime
        .map((item, index) => {
          if (index !== 3) {
            return Number(item) < 10 ? "0" + item : item;
          } else {
            if (Number(item) < 10) return "00" + item;
            else if (Number(item) < 100) return "0" + item;
            else return item;
          }
        })
        .join("");
      bTime = bTime
        .map((item, index) => {
          if (index !== 3) {
            return Number(item) < 10 ? "0" + item : item;
          } else {
            if (Number(item) < 10) return "00" + item;
            else if (Number(item) < 100) return "0" + item;
            else return item;
          }
        })
        .join("");

      if (Number(aTime) > Number(bTime)) return 1;
      else if (Number(aTime) < Number(bTime)) return -1;
    }
  };

  const socketReceive = useCallback(
    (message) => {
      if (Object.keys(JSON.parse(message.data))[0] === "privateMessage") {
        ChatWrite(
          JSON.parse(message.data).privateMessage.split(":")[1],
          "opponent",
          oneChater
        );
      } else if (Object.keys(JSON.parse(message.data))[0] === "members") {
        setInChat(JSON.parse(message.data).members.includes(oneChater));
      }
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    },
    [oneChater, setInChat]
  );

  useEffect(() => {
    const prevMessages = async () => {
      try {
        const result = await getPrevChats(id, oneChater);
        result.data.sort((a, b) => sortFunc(a, b)); // 추가 테스트 필요
        setPrevChats(result.data);
      } catch (e) {
        alert(`${e}`);
      }
    };
    prevMessages();
  }, [id, oneChater]);

  useEffect(() => {
    webSocket.current = new WebSocket(process.env.REACT_APP_SOCKET);
    webSocket.current.addEventListener("message", (message) =>
      socketReceive(message)
    );
    webSocket.current.addEventListener("open", () => {
      webSocket.current.send(JSON.stringify({ action: "setName", name: id }));
    });
  }, [id, webSocket, socketReceive]);

  useEffect(() => {
    chatBox.current.scrollTop = chatBox.current.scrollHeight;
  }, [prevChats]);

  return (
    <ChatFormBlock>
      <ul ref={chatBox}>
        {prevChats.length
          ? prevChats.map((item, index) => (
              <li key={index} className={item.from === id ? "me" : "opponent"}>
                <div className="infoBox">
                  {item.from !== id ? (
                    <div className="profile">{item.from}</div>
                  ) : (
                    ""
                  )}
                  <span className="time">{item.time}</span>
                </div>
                <div className="message">{item.message}</div>
              </li>
            ))
          : ""}
      </ul>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="message" />
        <input type="submit" value="보내기" />
      </form>
    </ChatFormBlock>
  );
};

export default ChatForm;
