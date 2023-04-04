import { createContext, useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import React from "react";
export const ChatContext = createContext(null);
const ChatProvider = ({ children }) => {
  const [chatID, setChatID] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [user, setUser] = useState(null);
  const socket = useRef();
  // useEffect(() => {
  //   socket.current = io("ws://localhost:9000");
  // }, []);
  return (
    <ChatContext.Provider
      value={{
        chatID,
        setChatID,
        receiver,
        setReceiver,
        socket,
        user,
        setUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
