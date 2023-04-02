import React from "react";
import { Routes, Route } from "react-router-dom";
import ChatDialog from "../components/chat/ChatDialog";

import Login from "../components/login/Login";

import ChatProvider from "../context/ChatProvider";
function Routing(props) {
  return (
    <ChatProvider>
      <Routes>
        <Route path="/" element={<ChatDialog />} />
      </Routes>
    </ChatProvider>
  );
}

export default Routing;
