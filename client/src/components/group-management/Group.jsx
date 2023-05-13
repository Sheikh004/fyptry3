import { Box, Typography, Button } from "@mui/material";
import React from "react";
import GroupMember from "./GroupMember";
import { useNavigate } from "react-router-dom";
function Group({ group }) {
  const navigate = useNavigate();
  const navigateToEditPage = () => {
    navigate("/edit-group", { state: group });
  };
  return (
    <Box>
      <Typography>{group.name}</Typography>
      <Button onClick={navigateToEditPage}>Edit Group</Button>
      {group.studentID.map((student, key) => {
        return <GroupMember student={student} key={key} />;
      })}
    </Box>
  );
}

export default Group;
