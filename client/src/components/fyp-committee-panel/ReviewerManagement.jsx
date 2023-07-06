import React, { useEffect, useState } from "react";
import FypNavBar from "../Navbar/FypNavBar";
import {
  getUnAssignedProposals,
  getReviewers,
  assignProposal,
  unassignProposal,
} from "../../api/api";
import {
  Link,
  Button,
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function ReviewerManagement(props) {
  const [currentProposal, setCurrentProposal] = useState();
  const [unAssignedProposals, setUnAssignedProposals] = useState();
  const [open, setOpen] = useState(false);
  const [reviewers, setReviewers] = useState();
  const [bool, setBool] = useState(false);
  const handleOpen = (proposal) => {
    setOpen(true);
    setCurrentProposal(proposal);
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
  const handleAssign = async (proposal, reviewerId) => {
    const result = await assignProposal(proposal._id, reviewerId);
    if (result.status === 200) {
      setBool(!bool);
    } else if (result.status === 403) {
      console.log(result.message);
    } else {
      console.log(result);
    }
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

  // Table for assigned proposals
  const AssignedProposalsTable = () => {
    if (!reviewers) return null;

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: 18, fontWeight: "bold" }}>
              Proposal
            </TableCell>
            <TableCell style={{ fontSize: 18, fontWeight: "bold" }}>
              Development Area
            </TableCell>
            <TableCell style={{ fontSize: 18, fontWeight: "bold" }}>
              Area of Interest
            </TableCell>
            <TableCell style={{ fontSize: 18, fontWeight: "bold" }}>
              Reviewer
            </TableCell>
            <TableCell style={{ fontSize: 18, fontWeight: "bold" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviewers.map((reviewer) =>
            reviewer.proposalList.map((proposal) => (
              <TableRow key={proposal._id}>
                <TableCell>
                  <Link href={proposal.filepath}>
                    {proposal.filepath.split("--").pop()}
                  </Link>
                </TableCell>
                <TableCell>
                  {proposal.developmentArea.map((field, index) => (
                    <Typography key={index}>{field}</Typography>
                  ))}
                </TableCell>
                <TableCell>
                  {proposal.areaOfInterest.map((interest, index) => (
                    <Typography key={index}>{interest}</Typography>
                  ))}
                </TableCell>
                <TableCell>
                  <Typography>Name: {reviewer._id.name}</Typography>
                  <Typography>Title: {reviewer._id.title}</Typography>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      handleUnassign(proposal._id, reviewer._id._id)
                    }
                    style={{
                      fontWeight: "bold",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "8px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                      padding: "8px 16px",
                    }}
                  >
                    Unassign
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    );
  };

  // Table for unassigned proposals
  const UnassignedProposalsTable = () => {
    if (!unAssignedProposals) return null;

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: 18, fontWeight: "bold" }}>
              Area of Interest
            </TableCell>
            <TableCell style={{ fontSize: 18, fontWeight: "bold" }}>
              Development Area
            </TableCell>
            <TableCell style={{ fontSize: 18, fontWeight: "bold" }}>
              Proposal
            </TableCell>
            <TableCell style={{ fontSize: 18, fontWeight: "bold" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {unAssignedProposals.map((proposal) => (
            <TableRow key={proposal._id}>
              <TableCell>
                {proposal.areaOfInterest.map((area, index) => (
                  <Typography key={index}>{area}</Typography>
                ))}
              </TableCell>
              <TableCell>
                {proposal.developmentArea.map((field, index) => (
                  <Typography key={index}>{field}</Typography>
                ))}
              </TableCell>
              <TableCell>
                <Link href={proposal.filepath}>
                  {proposal.filepath.split("--").pop()}
                </Link>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleOpen(proposal)}
                  variant="contained"
                  color="success"
                  style={{
                    fontWeight: "bold",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                    padding: "8px 16px",
                  }}
                >
                  Assign To
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", backgroundColor: "#28282B" }}>
        <FypNavBar />
      </div>
      <div style={{ padding: "20px" }}>
        <p
          style={{
            fontSize: 30,
            textAlign: "center",
            marginBottom: "10px",
            fontFamily: "bold",
            color: "white",
            backgroundColor: "green",
            borderRadius: "10px",
            padding: "5px",
            marginTop: "20px",
          }}
        >
          <b>Assigned Proposals:</b>
        </p>
        <AssignedProposalsTable />
        <p
          style={{
            fontSize: 30,
            textAlign: "center",
            marginBottom: "10px",
            fontFamily: "bold",
            color: "white",
            backgroundColor: "red",
            borderRadius: "10px",
            padding: "5px",
            marginTop: "20px",
          }}
        >
          <b>Unassigned Proposal:</b>
        </p>
        <UnassignedProposalsTable />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ resize: "both", overflow: "auto" }}
      >
        <div
          style={{
            backgroundColor: "lightgrey",
            borderRadius: "10px",
            margin: "40px",

            marginBottom: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontSize: 30,
              textAlign: "center",
              marginBottom: "10px",
              fontFamily: "bold",
              color: "white",
              backgroundColor: "#28282B",
              borderRadius: "10px",
              padding: "5px",
              marginTop: "20px",
            }}
          >
            Lecturers
          </h2>
          <table style={{ color: "black" }}>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>

            <thead>
              <tr>
                <th>Name</th>
                <th>Assigned</th>
                <th>Area of Interest</th>
                <th>Development Field</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviewers &&
                reviewers.map((reviewer) => {
                  if (
                    reviewer._id._id !== currentProposal?.supervisorId &&
                    reviewer._id.title === "Lecturer"
                  ) {
                    return (
                      <tr key={reviewer._id._id}>
                        <td style={{ padding: "5px" }}>{reviewer._id.name}</td>
                        <td style={{ padding: "5px" }}>
                          {reviewer.proposalList.length}
                        </td>
                        <td style={{ padding: "5px" }}>
                          {reviewer._id.areaOfInterest.map(
                            (interest, index) => (
                              <span key={index}>
                                {interest}
                                <br />
                              </span>
                            )
                          )}
                        </td>
                        <td style={{ padding: "5px" }}>
                          {reviewer._id.developmentField.map((field, index) => (
                            <span key={index}>
                              {field}
                              <br />
                            </span>
                          ))}
                        </td>
                        <td style={{ padding: "5px" }}>
                          <button
                            onClick={() =>
                              handleAssign(currentProposal, reviewer._id._id)
                            }
                            style={{
                              fontWeight: "bold",
                              backgroundColor: "GREEN",
                              color: "white",
                              borderRadius: "8px",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                              padding: "8px 16px",
                            }}
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
            </tbody>
          </table>

          <h2
            style={{
              fontSize: 30,
              textAlign: "center",
              marginBottom: "10px",
              fontFamily: "bold",
              color: "white",
              backgroundColor: "#28282B",
              borderRadius: "10px",
              padding: "5px",
              marginTop: "20px",
            }}
          >
            Assistant Professors
          </h2>

          <table style={{ color: "black" }}>
            <colgroup>
              <col style={{ width: "18.2%" }} />
              <col style={{ width: "18.2%" }} />
              <col style={{ width: "27.2%" }} />
              <col style={{ width: "27.5%" }} />
              <col style={{ width: "23%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Name</th>
                <th>Assigned</th>
                <th>Area of Interest</th>
                <th>Development Field</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviewers &&
                reviewers.map((reviewer) => {
                  if (
                    reviewer._id._id !== currentProposal?.supervisorId &&
                    reviewer._id.title === "Assistant Professor"
                  ) {
                    return (
                      <tr key={reviewer._id._id}>
                        <td style={{ padding: "5px" }}>{reviewer._id.name}</td>
                        <td style={{ padding: "5px" }}>
                          {reviewer.proposalList.length}
                        </td>
                        <td style={{ padding: "5px" }}>
                          {reviewer._id.areaOfInterest.map(
                            (interest, index) => (
                              <span key={index}>
                                {interest}
                                <br />
                              </span>
                            )
                          )}
                        </td>
                        <td style={{ padding: "5px" }}>
                          {reviewer._id.developmentField.map((field, index) => (
                            <span key={index}>
                              {field}
                              <br />
                            </span>
                          ))}
                        </td>
                        <td style={{ padding: "5px" }}>
                          <button
                            onClick={() =>
                              handleAssign(currentProposal, reviewer._id._id)
                            }
                            style={{
                              fontWeight: "bold",
                              backgroundColor: "Green",
                              color: "white",
                              borderRadius: "8px",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                              padding: "8px 16px",
                            }}
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
            </tbody>
          </table>
          <h2
            style={{
              fontSize: 30,
              textAlign: "center",
              marginBottom: "10px",
              fontFamily: "bold",
              color: "white",
              backgroundColor: "#28282B",
              borderRadius: "10px",
              padding: "5px",
              marginTop: "20px",
            }}
          >
            PHD Assistant Professors
          </h2>
          <table style={{ color: "black" }}>
            <colgroup>
              <col style={{ width: "18.2%" }} />
              <col style={{ width: "18.2%" }} />
              <col style={{ width: "27.2%" }} />
              <col style={{ width: "27.5%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Name</th>
                <th>Assigned</th>
                <th>Area of Interest</th>
                <th>Development Field</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviewers &&
                reviewers.map((reviewer) => {
                  if (
                    reviewer._id._id !== currentProposal?.supervisorId &&
                    reviewer._id.title === "PHD Assistant Professor"
                  ) {
                    return (
                      <tr key={reviewer._id._id}>
                        <td style={{ padding: "5px" }}>{reviewer._id.name}</td>
                        <td style={{ padding: "5px" }}>
                          {reviewer.proposalList.length}
                        </td>
                        <td style={{ padding: "5px" }}>
                          {reviewer._id.areaOfInterest.map(
                            (interest, index) => (
                              <span key={index}>
                                {interest}
                                <br />
                              </span>
                            )
                          )}
                        </td>
                        <td style={{ padding: "5px" }}>
                          {reviewer._id.developmentField.map((field, index) => (
                            <span key={index}>
                              {field}
                              <br />
                            </span>
                          ))}
                        </td>
                        <td style={{ padding: "5px" }}>
                          <button
                            onClick={() =>
                              handleAssign(currentProposal, reviewer._id._id)
                            }
                            style={{
                              fontWeight: "bold",
                              backgroundColor: "green",
                              color: "white",
                              borderRadius: "8px",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                              padding: "8px 16px",
                            }}
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
            </tbody>
          </table>
          <h2
            style={{
              fontSize: 30,
              textAlign: "center",
              marginBottom: "10px",
              fontFamily: "bold",
              color: "white",
              backgroundColor: "#28282B",
              borderRadius: "10px",
              padding: "5px",
              marginTop: "20px",
            }}
          >
            Associate Professors
          </h2>

          <table style={{ color: "black" }}>
            <colgroup>
              <col style={{ width: "18.2%" }} />
              <col style={{ width: "18.2%" }} />
              <col style={{ width: "27.2%" }} />
              <col style={{ width: "27.5%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Name</th>
                <th>Assigned</th>
                <th>Area of Interest</th>
                <th>Development Field</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviewers &&
                reviewers.map((reviewer) => {
                  if (
                    reviewer._id._id !== currentProposal?.supervisorId &&
                    reviewer._id.title === "Associate Professor"
                  ) {
                    return (
                      <tr key={reviewer._id._id}>
                        <td style={{ padding: "5px" }}>{reviewer._id.name}</td>
                        <td style={{ padding: "5px" }}>
                          {reviewer.proposalList.length}
                        </td>
                        <td style={{ padding: "5px" }}>
                          {reviewer._id.areaOfInterest.map(
                            (interest, index) => (
                              <span key={index}>
                                {interest}
                                <br />
                              </span>
                            )
                          )}
                        </td>
                        <td style={{ padding: "5px" }}>
                          {reviewer._id.developmentField.map((field, index) => (
                            <span key={index}>
                              {field}
                              <br />
                            </span>
                          ))}
                        </td>
                        <td style={{ padding: "5px" }}>
                          <button
                            onClick={() =>
                              handleAssign(currentProposal, reviewer._id._id)
                            }
                            style={{
                              fontWeight: "bold",
                              backgroundColor: "green",
                              color: "white",
                              borderRadius: "8px",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                              padding: "8px 16px",
                            }}
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}

export default ReviewerManagement;
