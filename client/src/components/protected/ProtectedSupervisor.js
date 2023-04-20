import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import Login from "../login/Login";
function ProtectedSupervisor({ children }) {
  const { user } = useContext(ChatContext);
  if (user) {
    if (user.type == "Supervisor") return children;
  } else return <Login />;
}

export default ProtectedSupervisor;
