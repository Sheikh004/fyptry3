import { Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { ChatContext } from "../../context/ChatProvider";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
import {
  getSupervisorGroups,
  getSupervisorProposals,
  updateProposalStatus,
  unUpdateProposalStatus,
} from "../../api/api";
function GroupProposals(props) {
  const { user } = useContext(ChatContext);
  const [supervisorGroups, setSupervisorGroups] = useState();
  const [supervisorProposals, setSupervisorProposals] = useState();
  const [groupProposals, setGroupProposals] = useState();
  const [approvalProposal, setApprovalProposal] = useState();
  const [unApprovalProposal, setUnApprovalProposal] = useState();

  const [reRun, setReRun] = useState(false);
  const setApprove = (proposalId) => {
    setApprovalProposal(proposalId);
    setUnApprovalProposal();
  };

  const setUnApprove = (proposalId) => {
    setUnApprovalProposal(proposalId);
    setApprovalProposal();
  };
  useEffect(() => {
    const unUpdateApproval = async () => {
      await unUpdateProposalStatus(unApprovalProposal);
      setReRun(!reRun);
    };
    if (unApprovalProposal) {
      unUpdateApproval();
    }
  }, [unApprovalProposal]);
  useEffect(() => {
    const updateApproval = async () => {
      await updateProposalStatus(approvalProposal);
      setReRun(!reRun);
    };
    if (approvalProposal) {
      updateApproval();
    }
  }, [approvalProposal]);
  useEffect(() => {
    const getGroups = async () => {
      const data = await getSupervisorGroups(user.id);
      setSupervisorGroups(data);
      const data2 = await getSupervisorProposals(user.id);
      setSupervisorProposals(data2);
    };
    getGroups();
  }, [reRun]);
  useEffect(() => {
    if (supervisorGroups && supervisorProposals) {
      let data34 = supervisorGroups.group.map((group) => {
        group.filepath = "";
        group.proposalId = "";
        group.proposalStatus = "";

        supervisorProposals.proposals.map((proposal) => {
          if (group._id === proposal.groupId) {
            group.filepath = proposal.filepath;
            group.proposalId = proposal._id;
            group.proposalStatus = proposal.status;
          }
        });

        return group;
      });

      setGroupProposals(data34);
    }
  }, [supervisorGroups, supervisorProposals]);
  return (
    <Box>
      <SupervisorNavbar />

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
                {group.proposalStatus &&
                  group.proposalStatus === "Approved" && (
                    <Button
                      onClick={() => {
                        setUnApprove(group.proposalId);
                      }}
                    >
                      Disapprove
                    </Button>
                  )}
                {group.proposalStatus &&
                  group.proposalStatus !== "Approved" && (
                    <Button
                      onClick={() => {
                        setApprove(group.proposalId);
                      }}
                    >
                      Approve
                    </Button>
                  )}
              </div>
            )}
            {!group.filepath && <p>Proposal Pending</p>}
          </Box>
        ))}
    </Box>
  );
}

export default GroupProposals;
