import { Box, Typography } from "@mui/material";
import React from "react";
import GroupMember from "./GroupMember";

function Group({ group }) {
  return (
    <Box>
      <Typography>{group.name}</Typography>
      {group.studentID.map((student, key) => {
        return <GroupMember student={student} key={key} />;
      })}
    </Box>
  );
}

export default Group;
