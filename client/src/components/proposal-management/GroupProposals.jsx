import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { getSupervisorGroups, getSupervisorProposals } from "../../api/api";
function GroupProposals(props) {
  const { user } = useContext(ChatContext);
  const [supervisorGroups, setSupervisorGroups] = useState();
  const [supervisorProposals, setSupervisorProposals] = useState();
  useEffect(() => {
    const getGroups = async () => {
      const data = await getSupervisorGroups(user.id);
      setSupervisorGroups(data);
      const data2 = await getSupervisorProposals(user.id);
      setSupervisorProposals(data2);
    };
    getGroups();
  }, []);

  return (
    <Box>
      {console.log(supervisorProposals)}
      {supervisorGroups &&
        supervisorGroups.group.map((group, index) => (
          <Box>
            <Typography>Group Name</Typography>
            <Typography>{group.name}</Typography>
            <Typography>Proposal</Typography>
          </Box>
        ))}
    </Box>
  );
}

export default GroupProposals;
