import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import Login from "../login/Login";
function ProtectedEvaluator({ children }) {
  const { user } = useContext(ChatContext);

  if (user) {
    // console.log(user);
    if (user.type == "Evaluator") return children;
  } else return <Login />;
}

export default ProtectedEvaluator;
