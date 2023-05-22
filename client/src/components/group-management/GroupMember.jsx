import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    <Box>
      <Typography>{student.name}</Typography>
      <Button
        onClick={() => {
          navigateStudentDetails(student);
        }}
      >
        View Tasks
      </Button>
      <Button
        onClick={navigateAssignTask}
        variant="outlined"
        sx={{
          bgcolor: "#052f72",
          color: "white",
          border: "1px solid #052f72",
          borderRadius: "4px",
          padding: "8px 16px",
          fontWeight: "bold",
          textTransform: "uppercase",
          transition: "background-color 0.3s ease",
          "&:hover": {
            bgcolor: "white",
            color: "#052f72",
          },
        }}
      >
        Assign New Task
      </Button>
    </Box>
  );
}

export default GroupMember;
