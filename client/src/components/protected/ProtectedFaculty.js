import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import Login from "../login/Login";
function ProtectedFaculty({ children }) {
  const { user } = useContext(ChatContext);

  if (user) {
    // console.log(user);
    if (
      user.type == "Evaluator" ||
      user.type == "Reviewer" ||
      user.type == "Supervisor"
    )
      return children;
  } else return <Login />;
}

export default ProtectedFaculty;
