import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import Login from "../login/Login";
function ProtectedUser({ children }) {
  const { user } = useContext(ChatContext);
  if (user) return children;
  else return <Login />;
}

export default ProtectedUser;
