import React from "react";
import { Routes, Route } from "react-router-dom";
import ChatDialog from "../components/chat/ChatDialog";

import Login from "../components/login/Login";

function Routing(props) {
  return (
    <Routes>
      <Route path="/" component={Login} />
      <Route path="/SupervisorHome" component={ChatDialog} />
      <Route path="*" component={Login} />
    </Routes>
  );
}

export default Routing;
