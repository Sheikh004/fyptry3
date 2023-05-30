import React, { useEffect, useState } from "react";
import {
  getUnAssignedProposals,
  getReviewers,
  assignProposal,
  unassignProposal,
} from "../../api/api";
import { Link, Button, Modal, Box, Typography } from "@mui/material";

function ReviewerManagement(props) {
  const [currentProposal, setCurrentProposal] = useState();
  const [unAssignedProposals, setUnAssignedProposals] = useState();
  const [open, setOpen] = useState(false);
  const [reviewers, setReviewers] = useState();
  const [bool, setBool] = useState(false);
  const handleOpen = (proposalId) => {
    setOpen(true);
    setCurrentProposal(proposalId);
  };
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    height: "90%",
    pt: 2,
    px: 4,
    pb: 3,
    overflowY: "auto",
  };
  const handleAssign = async (proposalId, reviewerId) => {
    const result = await assignProposal(proposalId, reviewerId);
    if (result.status === 200) {
      setBool(!bool);
    }
    console.log(result);
  };
  const handleUnassign = async (proposalId, reviewerId) => {
    const result2 = await unassignProposal(proposalId, reviewerId);
    if (result2.status === 200) {
      setBool(!bool);
    }
    console.log(result2);
  };
  useEffect(() => {
    const getTotalUnassignedProposals = async () => {
      const data = await getUnAssignedProposals();

      if (data) {
        const unassignedProposalList = data.filter((proposal) => {
          if (proposal.isAssigned === false) return proposal;
        });
        setUnAssignedProposals(unassignedProposalList);
      }
    };
    getTotalUnassignedProposals();
  }, [bool]);
  useEffect(() => {
    const getReviewersList = async () => {
      const data2 = await getReviewers();
      if (data2) {
        data2.sort((a, b) => {
          return a.proposalList.length - b.proposalList.length;
        });
        setReviewers(data2);
      }
    };
    getReviewersList();
  }, [bool]);
  return (
    <div>
      <p>Total assigned Tasks:</p>
      {reviewers &&
        reviewers.map((reviewer) => {
          return (
            <div>
              {reviewer.proposalList.map((proposal) => {
                return (
                  <div>
                    {" "}
                    <p>Proposal:</p>
                    <Link href={proposal.filepath}>
                      {proposal.filepath.split("--").pop()}
                    </Link>
                    <p>Development Area:</p>
                    <p>{proposal.developmentArea}</p>
                    <p>Area of Interest</p>
                    <p>{proposal.areaOfInterest}</p>
                    <p>Reviewer</p>
                    <p>Name: {reviewer._id.name}</p>
                    <p>Title: {reviewer._id.title}</p>
                    <Button
                      onClick={() => {
                        handleUnassign(proposal._id, reviewer._id._id);
                      }}
                    >
                      Unassign
                    </Button>
                  </div>
                );
              })}
            </div>
          );
        })}
      <p>
        Total unassigned tasks:
        {unAssignedProposals && unAssignedProposals.length}
      </p>
      {unAssignedProposals &&
        unAssignedProposals.map((proposal) => {
          return (
            <div>
              <p>Area of Interest:</p>
              {proposal.areaOfInterest.map((area) => {
                return <p>{area}</p>;
              })}
              <p>Development Area:</p>
              <p>{proposal.developmentArea}</p>
              <p>Proposal:</p>
              <Link href={proposal.filepath}>
                {proposal.filepath.split("--").pop()}
              </Link>

              <Button
                onClick={() => {
                  handleOpen(proposal._id);
                }}
              >
                Assign To
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography variant="h4">Lecturers</Typography>
                  {reviewers &&
                    reviewers.map((reviewer) => {
                      {
                        return (
                          reviewer._id.title === "Lecturer" && (
                            <Box>
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                              >
                                {reviewer._id.name}
                              </Typography>
                              <Typography>{reviewer._id.title}</Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Total Number of Assigned Proposals:{" "}
                                {reviewer.proposalList.length}
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Area of Interest: {reviewer._id.areaOfInterest}
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Developmment Field:{" "}
                                {reviewer._id.developmentField}
                              </Typography>
                              <Button
                                onClick={() => {
                                  handleAssign(
                                    currentProposal,
                                    reviewer._id._id
                                  );
                                }}
                              >
                                Assign
                              </Button>
                            </Box>
                          )
                        );
                      }
                    })}
                  <Typography variant="h4">Assistant Professors</Typography>
                  {reviewers &&
                    reviewers.map((reviewer) => {
                      {
                        return (
                          reviewer._id.title === "Assistant Professor" && (
                            <Box>
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                              >
                                {reviewer._id.name}
                              </Typography>
                              <Typography>{reviewer._id.title}</Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Total Number of Assigned Proposals:{" "}
                                {reviewer.proposalList.length}
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Area of Interest: {reviewer._id.areaOfInterest}
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Developmment Field:{" "}
                                {reviewer._id.developmentField}
                              </Typography>
                              <Button
                                onClick={() => {
                                  handleAssign(
                                    currentProposal,
                                    reviewer._id._id
                                  );
                                }}
                              >
                                Assign
                              </Button>
                            </Box>
                          )
                        );
                      }
                    })}
                  <Typography variant="h4">PHD Assistant Professors</Typography>
                  {reviewers &&
                    reviewers.map((reviewer) => {
                      {
                        return (
                          reviewer._id.title === "PHD Assistant Professor" && (
                            <Box>
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                              >
                                {reviewer._id.name}
                              </Typography>
                              <Typography>{reviewer._id.title}</Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Total Number of Assigned Proposals:{" "}
                                {reviewer.proposalList.length}
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Area of Interest: {reviewer._id.areaOfInterest}
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Developmment Field:{" "}
                                {reviewer._id.developmentField}
                              </Typography>
                              <Button
                                onClick={() => {
                                  handleAssign(
                                    currentProposal,
                                    reviewer._id._id
                                  );
                                }}
                              >
                                Assign
                              </Button>
                            </Box>
                          )
                        );
                      }
                    })}
                  <Typography variant="h4">Associate Professor</Typography>
                  {reviewers &&
                    reviewers.map((reviewer) => {
                      {
                        return (
                          reviewer._id.title === "Associate Professor" && (
                            <Box>
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                              >
                                {reviewer._id.name}
                              </Typography>
                              <Typography>{reviewer._id.title}</Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Total Number of Assigned Proposals:{" "}
                                {reviewer.proposalList.length}
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Area of Interest: {reviewer._id.areaOfInterest}
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Developmment Field:{" "}
                                {reviewer._id.developmentField}
                              </Typography>
                              <Button
                                onClick={() => {
                                  handleAssign(
                                    currentProposal,
                                    reviewer._id._id
                                  );
                                }}
                              >
                                Assign
                              </Button>
                            </Box>
                          )
                        );
                      }
                    })}
                </Box>
              </Modal>
            </div>
          );
        })}
    </div>
  );
}

export default ReviewerManagement;
