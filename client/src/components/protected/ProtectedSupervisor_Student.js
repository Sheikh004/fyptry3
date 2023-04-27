import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import Login from "../login/Login";
function ProtectedSupervisor_Student({ children }) {
  const { user } = useContext(ChatContext);
  if (user) {
    if (user.type == "Supervisor" || user.type == "Student") return children;
  } else return <Login />;
}

export default ProtectedSupervisor_Student;
