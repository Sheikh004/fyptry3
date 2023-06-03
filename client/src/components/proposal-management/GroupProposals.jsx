import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Modal,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { ChatContext } from "../../context/ChatProvider";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
import { formatTimeAMPM2, formatDate2 } from "../../utils/common-utils";
import {
  getSupervisorGroups,
  getSupervisorProposals,
  updateProposalStatus,
  unUpdateProposalStatus,
  deleteComment,
  createComment,
  getGroupComments,

  // createNotification,
} from "../../api/api";
function GroupProposals(props) {
  const { user } = useContext(ChatContext);
  const [supervisorGroups, setSupervisorGroups] = useState();
  const [supervisorProposals, setSupervisorProposals] = useState();
  const [groupProposals, setGroupProposals] = useState();
  const [approvalProposal, setApprovalProposal] = useState();
  const [unApprovalProposal, setUnApprovalProposal] = useState();
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [refresh2, setRefresh2] = useState(false);
  const [open, setOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [currentProposal, setCurrentProposal] = useState();
  const [existingValue, setExistingValue] = useState();
  const [reRun, setReRun] = useState(false);

  const handleOpen = (pid) => {
    setOpen(true);
    setCurrentProposal(pid);
  };

  const handleClose = () => {
    setOpen(false);
    setComments([]);
    setCurrentProposal(null);
    setCommentValue("");
    setSubmit(false);
  };

  const handleDeleteComment = async (cid) => {
    const deleteResult = await deleteComment(cid);
    if (deleteResult) setRefresh2(!refresh2);
  };

  const setApprove = (proposalId) => {
    setApprovalProposal(proposalId);
    setUnApprovalProposal();
  };

  const setUnApprove = (proposalId) => {
    setUnApprovalProposal(proposalId);
    setApprovalProposal();
  };

  const handleRadio = (value, propoId) => {
    setExistingValue(value);
    if (value == "Approved") setApprove(propoId);
    if (value == "Disapproved") setUnApprove(propoId);
  };
  useEffect(() => {
    const unUpdateApproval = async () => {
      const response = await unUpdateProposalStatus(unApprovalProposal);
      // if (response)
      //   await createNotification({
      //     notification:
      //       "Your proposal has been disapproved. You may contact your supervisor",
      //     // createdBy: group._id,
      //     // createdFor: group.supervisorId,
      //   });
      setReRun(!reRun);
    };
    if (unApprovalProposal) {
      unUpdateApproval();
    }
  }, [unApprovalProposal]);

  useEffect(() => {
    const fetchComments = async () => {
      console.log(commentValue);
      if (currentProposal && submit === false) {
        const proposalComments = await getGroupComments(currentProposal);
        console.log(proposalComments.data);

        setComments(proposalComments.data);
      }
    };
    fetchComments();
  }, [currentProposal, submit, commentValue, refresh2]);

  useEffect(() => {
    const sendComment = async () => {
      if (currentProposal && submit === true && commentValue !== "") {
        const result = await createComment({
          fid: user.id,
          pid: currentProposal,
          commentText: commentValue,
        });
        setSubmit(false);
        setCommentValue("");
        console.log(result);
      } else setSubmit(false);
    };
    sendComment();
  }, [submit, currentProposal]);

  useEffect(() => {
    const updateApproval = async () => {
      const response = await updateProposalStatus(approvalProposal);
      // if (response)
      //   await createNotification({
      //     notification: "Your proposal has been approved",
      //     // createdBy: group._id,
      //     // createdFor: group.supervisorId,
      //   });
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
    <Box display="flex">
      <Box style={{ width: "20%", backgroundColor: "#28282B" }}>
        <SupervisorNavbar />
      </Box>

      <Box
        width="80%"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "lightgrey",
          flexDirection: "row",
        }}
      >
        <Table
          style={{
            margin: "0 auto",
            border: "1px solid black",
            backgroundColor: "white",
            width: "90%",
            border: "3px",
            borderColor: "black" /* Border properties with black color */,
            borderRadius: "20px" /* Border radius */,
            boxShadow: "black",
            hight: "100vh",
          }}
        >
          <TableHead style={{ backgroundColor: "#28282B" }}>
            <TableRow>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Group Name
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Proposal
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Add Comments
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupProposals &&
              groupProposals.map((group, index) => (
                <TableRow key={index}>
                  <TableCell style={{ color: "black" }}>{group.name}</TableCell>
                  <TableCell>
                    {group.filepath ? (
                      <div>
                        <a href={group.filepath}>
                          {group.filepath.split("--").pop()}
                        </a>
                      </div>
                    ) : (
                      <p style={{ color: "red", paddingTop: "17px" }}>
                        Proposal Pending
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    {/* {group.proposalStatus === "Approved" && (
                      <Button
                        onClick={() => {
                          setUnApprove(group.proposalId);
                        }}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "white";
                          e.target.style.color = "red";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "red";
                          e.target.style.color = "white";
                        }}
                      >
                        Disapprove
                      </Button>
                    )}
                    {group.proposalStatus === "Pending" && (
                      <Button
                        onClick={() => {
                          setApprove(group.proposalId);
                        }}
                        style={{
                          backgroundColor: "green",
                          color: "white",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "white";
                          e.target.style.color = "green";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "green";
                          e.target.style.color = "white";
                        }}
                      >
                        Approve
                      </Button>
                    )} */}
                    {group && group.proposalStatus && group.filepath != "" && (
                      <div>
                        <label style={{ marginRight: "10px" }}>
                          <input
                            key={"radio1" + index}
                            type="radio"
                            value="Approved"
                            checked={group.proposalStatus === "Approved"}
                            onChange={(e) =>
                              handleRadio(e.target.value, group.proposalId)
                            }
                            style={{
                              marginRight: "5px",
                              transform: "scale(1.5)",
                            }}
                          />
                          Approve
                        </label>
                        <label style={{ marginRight: "10px" }}>
                          <input
                            key={"radio2" + index}
                            type="radio"
                            value="Disapproved"
                            checked={group.proposalStatus === "Disapproved"}
                            onChange={(e) =>
                              handleRadio(e.target.value, group.proposalId)
                            }
                            style={{
                              marginRight: "5px",
                              transform: "scale(1.5)",
                            }}
                          />
                          Disapprove
                        </label>
                        {/* Render other radio buttons as needed */}
                      </div>
                    )}
                  </TableCell>
                  {group && group.proposalStatus && group.filepath !== "" && (
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleOpen(group.proposalId);
                        }}
                      >
                        Add Comments
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Modal open={open} onClose={handleClose}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Comments
            </Typography>

            <div>
              {comments &&
                comments.length !== 0 &&
                comments.map((comment, index) => (
                  <Box key={"Box" + index}>
                    {comment.senderId === user.id ? (
                      <Typography key={"idenme" + index}>Me</Typography>
                    ) : (
                      <Typography key={"idenother" + index}>
                        Reviewer
                      </Typography>
                    )}

                    <Typography
                      key={"text" + index}
                      variant="body1"
                      gutterBottom
                    >
                      {comment.text}
                    </Typography>
                    <Typography key={"time" + index}>
                      {formatTimeAMPM2(comment.createdAt)},
                      {formatDate2(comment.createdAt)}
                    </Typography>
                    <Button
                      key={"delete" + index}
                      onClick={() => {
                        handleDeleteComment(comment._id);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
            </div>

            <TextField
              name="comment"
              label="Add a comment"
              variant="outlined"
              fullWidth
              value={commentValue}
              margin="normal"
              onChange={(e) => {
                setCommentValue(e.target.value);
              }}
            />

            <Button
              onClick={() => {
                setSubmit(true);
              }}
              variant="contained"
              color="primary"
            >
              Add Comment
            </Button>
          </div>
        </Modal>
      </Box>
    </Box>
  );
}

export default GroupProposals;
