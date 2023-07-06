import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIcon from "@mui/icons-material/Assignment";
import React from "react";

function GroupMember({ student }) {
  const navigate = useNavigate();
  const navigateAssignTask = () => {
    navigate("/assign-task", { state: student });
  };
  const navigateStudentDetails = () => {
    navigate("/student-details", { state: student });
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography>{student.name}</Typography>
      <IconButton onClick={navigateStudentDetails} title="View Task">
        <VisibilityIcon style={{ color: "black" }} />
      </IconButton>
      <IconButton
        onClick={navigateAssignTask}
        variant="outlined"
        title="Assign Task"
      >
        <AssignmentIcon style={{ color: "black" }} />
      </IconButton>
    </Box>
  );
}

export default GroupMember;
