import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
function ReviewerDashboard(props) {
  const navigate = useNavigate();
  return (
    <div>
      <p>Hi this is reviewer dashboard</p>
      <Button
        onClick={() => {
          navigate("/reviewer-group-proposals");
        }}
      >
        Go to Assigned Proposals
      </Button>
    </div>
  );
}

export default ReviewerDashboard;
