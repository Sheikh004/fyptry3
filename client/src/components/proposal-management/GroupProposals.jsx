import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { getSupervisorGroups, getSupervisorProposals } from "../../api/api";
function GroupProposals(props) {
  const { user } = useContext(ChatContext);
  const [supervisorGroups, setSupervisorGroups] = useState();
  const [supervisorProposals, setSupervisorProposals] = useState();
  const [groupProposals, setGroupProposals] = useState();
  const handleNoveltyRedirect = () => {};
  useEffect(() => {
    const getGroups = async () => {
      const data = await getSupervisorGroups(user.id);
      setSupervisorGroups(data);
      const data2 = await getSupervisorProposals(user.id);
      setSupervisorProposals(data2);
    };
    getGroups();
  }, []);
  useEffect(() => {
    // let groupProposalArr = [];
    if (supervisorGroups && supervisorProposals) {
      let data34 = supervisorGroups.group.map((group) => {
        let newgroup = group;

        supervisorProposals.proposals.map((proposal) => {
          if (group._id === proposal.groupId) {
            newgroup.filepath = proposal.filepath;
            newgroup.proposalId = proposal._id;
          } else {
            newgroup.filepath = "";
            newgroup.proposalId = "";
          }
          // groupProposalArr.push(newgroup);
        });

        return newgroup;
      });
      setGroupProposals(data34);
    }
  }, [supervisorGroups, supervisorProposals]);
  return (
    <Box>
      {groupProposals &&
        groupProposals.map((group, index) => (
          <Box key={"box" + index}>
            <Typography key={"groupName" + index}>Group Name</Typography>
            <Typography key={"group name" + index}>{group.name}</Typography>
            <Typography key={"proposal" + index}>Proposal</Typography>
            {group.filepath && (
              <div>
                <a key={"proposalIs" + index} href={group.filepath}>
                  {group.filepath.split("--").pop()}
                </a>
                <button onClick={handleNoveltyRedirect}>Novelty Checker</button>
              </div>
            )}
            {!group.filepath && <p>Proposal not submitted</p>}
          </Box>
        ))}
    </Box>
  );
}

export default GroupProposals;
