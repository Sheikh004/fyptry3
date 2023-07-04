import React, { useEffect, useContext, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import {
  getReviewerProposals,
  updateProposalReviewerStatus,
  createComment,
  createNotification,
  getComments,
  deleteComment,
} from "../../api/api";
import { Box, Typography, Link, Button, Modal, TextField } from "@mui/material";
import { formatTimeAMPM2, formatDate2 } from "../../utils/common-utils";
function ReviewerGroupProposals(props) {
  const { user } = useContext(ChatContext);
  const [proposalList, setProposalList] = useState();
  const [refresh, setRefresh] = useState(false);
  const [currentProposal, setCurrentProposal] = useState();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [refresh2, setRefresh2] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [currentGroup, setCurrentGroup] = useState();

  const handleOpen = (pid, gid) => {
    setOpen(true);
    setCurrentProposal(pid);
    setCurrentGroup(gid);
  };
  const handleDeleteComment = async (cid) => {
    const deleteResult = await deleteComment(cid);
    if (deleteResult && currentGroup) {
      const notif4 = await createNotification({
        notification:
          "A comment has been deleted by the reviewer for the submitted proposal",
        createdBy: user.id,
        createdFor: currentGroup,
        notifType: "Proposal",
      });
      console.log(notif4);
    }
    if (deleteResult) setRefresh2(!refresh2);
  };
  const handleClose = () => {
    setOpen(false);
    setComments([]);
    setCurrentProposal(null);
    setCommentValue("");
    setSubmit(false);
  };
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
        if (result && currentGroup) {
          const notif3 = await createNotification({
            notification:
              "A comment has been added by the reviewer for the submitted proposal",
            createdBy: user.id,
            createdFor: currentGroup,
            notifType: "Proposal",
          });
          // console.log(notif3);
        }
      } else setSubmit(false);
    };
    sendComment();
  }, [submit, currentProposal]);

  const handleRadio = async (proposalId, value) => {
    const data2 = await updateProposalReviewerStatus(proposalId, value);
    console.log(data2);
    if (data2.status === 200) {
      const notif2 = await createNotification({
        notification: "Your proposal has been " + data2?.data?.reviewerStatus,
        createdBy: user.id,
        createdFor: data2?.data?.groupId,
        notifType: "Proposal",
      });
      // console.log(notif2);
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      console.log(commentValue);
      if (currentProposal && submit === false) {
        const proposalComments = await getComments(currentProposal, user.id);
        console.log(proposalComments);

        setComments(proposalComments);
      }
    };
    fetchComments();
  }, [currentProposal, submit, commentValue, refresh2]);

  useEffect(() => {
    const getReviewerProposalList = async () => {
      const data = await getReviewerProposals(user.id);
      if (data) setProposalList(data.data.proposalList);
      console.log(data.data.proposalList);
    };
    getReviewerProposalList();
  }, [refresh]);
  return (
    <Box>
      <Typography>Pending Proposals</Typography>
      {proposalList &&
        proposalList.map((proposal, index) => {
          return (
            <Box key={"PMainBox" + index}>
              {proposal && proposal.reviewerStatus === "Pending" && (
                <Box key={"PBox1" + index}>
                  <Link href={proposal.filepath} key={"PLink1" + index}>
                    {proposal.filepath.split("--").pop()}
                  </Link>
                  <div key={"Pdiv1" + index}>
                    <label
                      style={{ marginRight: "10px" }}
                      key={"Plabel" + index}
                    >
                      <input
                        key={"Pradio1" + index}
                        type="radio"
                        value="Approved"
                        checked={proposal.reviewerStatus === "Approved"}
                        onChange={(e) =>
                          handleRadio(proposal._id, e.target.value)
                        }
                        style={{
                          marginRight: "5px",
                          transform: "scale(1.5)",
                        }}
                      />
                      Approve
                    </label>
                    <label
                      key={"Plabel2" + index}
                      style={{ marginRight: "10px" }}
                    >
                      <input
                        key={"Pradio2" + index}
                        type="radio"
                        value="Disapproved"
                        checked={proposal.reviewerStatus === "Disapproved"}
                        onChange={(e) =>
                          handleRadio(proposal._id, e.target.value)
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
                </Box>
              )}
            </Box>
          );
        })}
      <Typography>Approved Proposals</Typography>
      {proposalList &&
        proposalList.map((proposal, index) => {
          return (
            <Box key={"Abox1" + index}>
              {console.log(proposal)}
              {/* <Typography>Approved Proposals</Typography> */}
              {proposal && proposal.reviewerStatus === "Approved" && (
                <Box key={"Abox2" + index}>
                  <Link href={proposal.filepath} key={"ALink1" + index}>
                    {proposal.filepath.split("--").pop()}
                  </Link>
                  <div key={"ADiv" + index}>
                    <label
                      style={{ marginRight: "10px" }}
                      key={"ALabel" + index}
                    >
                      <input
                        key={"Aradio1" + index}
                        type="radio"
                        value="Approved"
                        checked={proposal.reviewerStatus === "Approved"}
                        onChange={(e) =>
                          handleRadio(proposal._id, e.target.value)
                        }
                        style={{
                          marginRight: "5px",
                          transform: "scale(1.5)",
                        }}
                      />
                      Approve
                    </label>
                    <label
                      style={{ marginRight: "10px" }}
                      key={"Alabel2" + index}
                    >
                      <input
                        key={"Aradio2" + index}
                        type="radio"
                        value="Disapproved"
                        checked={proposal.reviewerStatus === "Disapproved"}
                        onChange={(e) =>
                          handleRadio(proposal._id, e.target.value)
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
                  <Button
                    key={"Abutton1" + index}
                    onClick={() => {
                      handleOpen(proposal._id, proposal.groupId);
                    }}
                  >
                    Comments
                  </Button>
                </Box>
              )}
            </Box>
          );
        })}
      <Typography>Disapproved Proposals</Typography>
      {proposalList &&
        proposalList.map((proposal, index) => {
          return (
            <Box key={"MainDBox" + index}>
              {/* <Typography>Disapproved Proposals</Typography> */}
              {proposal && proposal.reviewerStatus === "Disapproved" && (
                <Box key={"DBox1" + index}>
                  <Link href={proposal.filepath} key={"DLink1" + index}>
                    {proposal.filepath.split("--").pop()}
                  </Link>
                  <div key={"Ddiv1" + index}>
                    <label
                      style={{ marginRight: "10px" }}
                      key={"DLabel1" + index}
                    >
                      <input
                        key={"Dradio1" + index}
                        type="radio"
                        value="Approved"
                        checked={proposal.reviewerStatus === "Approved"}
                        onChange={(e) =>
                          handleRadio(proposal._id, e.target.value)
                        }
                        style={{
                          marginRight: "5px",
                          transform: "scale(1.5)",
                        }}
                      />
                      Approve
                    </label>
                    <label
                      key={"DLabel2" + index}
                      style={{ marginRight: "10px" }}
                    >
                      <input
                        key={"Dradio2" + index}
                        type="radio"
                        value="Disapproved"
                        checked={proposal.reviewerStatus === "Disapproved"}
                        onChange={(e) =>
                          handleRadio(proposal._id, e.target.value)
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
                  <Button
                    key={"DButton1" + index}
                    onClick={() => {
                      handleOpen(proposal._id);
                    }}
                  >
                    Comments
                  </Button>
                </Box>
              )}
            </Box>
          );
        })}
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
            {comments.length !== 0 &&
              comments.map((comment, index) => (
                <Box key={"Box" + index}>
                  {comment.senderId === user.id ? (
                    <Typography key={"idenme" + index}>Me</Typography>
                  ) : (
                    <Typography key={"idenother" + index}>
                      Supervisor
                    </Typography>
                  )}
                  <Typography key={"text" + index} variant="body1" gutterBottom>
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
  );
}

export default ReviewerGroupProposals;
