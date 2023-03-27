import React from "react";
import { Routes, Route } from "react-router-dom";
import ChatDialog from "../components/chat/ChatDialog";
import Conversations from "../components/chat/menu/Conversations";
import Login from "../components/login/Login";
import ReceiverProvider from "../context/ReceiverProvider";
function Routing(props) {
  return (
    <ReceiverProvider>
      <Routes>
        <Route path="/" element={<ChatDialog />} />
      </Routes>
    </ReceiverProvider>
  );
}

export default Routing;
