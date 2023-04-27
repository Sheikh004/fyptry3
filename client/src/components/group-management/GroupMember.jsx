import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import React from "react";

function GroupMember({ student }) {
  const navigate = useNavigate();
  const navigateStudentDetails = () => {
    navigate("/student-details", { state: student });
  };
  return (
    <Box>
      <Typography>{student.name}</Typography>
      <Button onClick={navigateStudentDetails}>View Details</Button>
    </Box>
  );
}

export default GroupMember;
