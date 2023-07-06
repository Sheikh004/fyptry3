import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FypNavBar from "../Navbar/FypNavBar";
function FYPComHome(props) {
  const navigate = useNavigate();
  return (
    <div>
      <FypNavBar />
      <p>Hi! this is admin panel homepage</p>
      <Button
        onClick={() => {
          navigate("/reviewer-management");
        }}
      >
        Reviewer Management(Assign/Unassign Proposals)
      </Button>
      <Button
        onClick={() => {
          navigate("/evaluator-management");
        }}
      >
        Evaluator Management(Assign/Unassign Groups)
      </Button>
      <Button
        onClick={() => {
          navigate("/event-management");
        }}
      >
        Event Management
      </Button>
    </div>
  );
}

export default FYPComHome;
