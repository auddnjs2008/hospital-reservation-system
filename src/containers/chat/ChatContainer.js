import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatComponent from "../../components/chat/ChatComponent";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { id, chatRvName, chatShow } = useSelector(({ auth, chat }) => ({
    id: auth.auth.id,
    chatRvName: chat.name,
    chatShow: chat.window,
  }));

  return (
    <>
      {id ? (
        <ChatComponent
          dispatch={dispatch}
          chatRvName={chatRvName}
          chatShow={chatShow}
          id={id}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ChatContainer;
