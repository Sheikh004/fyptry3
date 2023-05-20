import { Box, Typography, Button } from "@mui/material";
import React from "react";
import GroupMember from "./GroupMember";

function Group({ group }) {
  return (
    <Box>
      {group.studentID.map((student, key) => {
        return (
          <Box>
            <GroupMember student={student} key={key} />
            {console.log(student._id)}
          </Box>
        );
      })}
    </Box>
  );
}

export default Group;
