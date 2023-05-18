import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import Login from "../login/Login";
function ProtectedFYPCommittee({ children }) {
  const { user } = useContext(ChatContext);

  if (user) {
    if (user.type == "FYPCommittee") return children;
  } else return <Login />;
}

export default ProtectedFYPCommittee;
