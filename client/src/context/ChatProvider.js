import { createContext, useState } from "react";
import React from "react";
export const ChatContext = createContext(null);
const ChatProvider = ({ children }) => {
  const [chatID, setChatID] = useState("");
  const [receiver, setReceiver] = useState(null);
  return (
    <ChatContext.Provider value={{ chatID, setChatID, receiver, setReceiver }}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
