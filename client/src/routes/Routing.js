import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/login/Login";

function Routing(props) {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default Routing;
