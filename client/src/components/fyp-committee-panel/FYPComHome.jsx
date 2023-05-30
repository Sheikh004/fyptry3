import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function FYPComHome(props) {
  const navigate = useNavigate();
  return (
    <div>
      <p>Hi! this is admin panel homepage</p>
      <Button
        onClick={() => {
          navigate("/reviewer-management");
        }}
      >
        Reviewer Management(Assign/Unassign Proposals)
      </Button>
    </div>
  );
}

export default FYPComHome;
