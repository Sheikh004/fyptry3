import { Box, Button, Typography } from "@mui/material";
import React from "react";

function GroupMember({ student }) {
  return (
    <Box>
      <Typography>{student.name}</Typography>
      <Button>View Details</Button>
    </Box>
  );
}

export default GroupMember;
