import React, { useEffect, useContext, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { getReviewerProposals } from "../../api/api";
import { Box, Typography, Link } from "@mui/material";
function ReviewerGroupProposals(props) {
  const { user } = useContext(ChatContext);
  const [proposalList, setProposalList] = useState();
  const [approval, setApproval] = useState();
  const handleRadio = () => {
    setApproval();
  };
  useEffect(() => {
    const getReviewerProposalList = async () => {
      const data = await getReviewerProposals(user.id);
      if (data) setProposalList(data.data.proposalList);
      console.log(data.data.proposalList);
    };
    getReviewerProposalList();
  }, []);
  return (
    <Box>
      {proposalList &&
        proposalList.map((proposal) => {
          return (
            <Box>
              <Typography>Pending Proposals</Typography>
              {proposal && proposal.reviewerStatus === "Pending" && (
                <Box>
                  <Link href={proposal.filepath}>
                    {proposal.filepath.split("--").pop()}
                  </Link>
                  <div>
                    <label style={{ marginRight: "10px" }}>
                      <input
                        // key={"radio1" + index}
                        name={`proposalStatus_forApproval${proposal._id}`}
                        type="radio"
                        value="Approved"
                        checked={proposal.reviewerStatus === "Approved"}
                        onChange={(e) =>
                          handleRadio(e.target.value, proposal._id)
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
                        // key={"radio2" + index}
                        name={`proposalStatus_forDisapproval${proposal._id}`}
                        type="radio"
                        value="Disapproved"
                        checked={proposal.reviewerStatus === "Disapproved"}
                        onChange={(e) =>
                          handleRadio(e.target.value, proposal._id)
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
              <Typography>Disapproved Proposals</Typography>
              {proposal && proposal.reviewerStatus === "Disapproved" && (
                <Box>
                  <Link href={proposal.filepath}>
                    {proposal.filepath.split("--").pop()}
                  </Link>
                  <div>
                    <label style={{ marginRight: "10px" }}>
                      <input
                        // key={"radio1" + index}
                        name={`proposalStatus_forApproval${proposal._id}`}
                        type="radio"
                        value="Approved"
                        checked={proposal.reviewerStatus === "Approved"}
                        onChange={(e) =>
                          handleRadio(e.target.value, proposal._id)
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
                        // key={"radio2" + index}
                        name={`proposalStatus_forDisapproval${proposal._id}`}
                        type="radio"
                        value="Disapproved"
                        checked={proposal.reviewerStatus === "Disapproved"}
                        onChange={(e) =>
                          handleRadio(e.target.value, proposal._id)
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
              <Typography>Approved Proposals</Typography>
              {proposal && proposal.reviewerStatus === "Approved" && (
                <Box>
                  <Link href={proposal.filepath}>
                    {proposal.filepath.split("--").pop()}
                  </Link>
                  <div>
                    <label style={{ marginRight: "10px" }}>
                      <input
                        // key={"radio1" + index}
                        name={`proposalStatus_forApproval${proposal._id}`}
                        type="radio"
                        value="Approved"
                        checked={proposal.reviewerStatus === "Approved"}
                        onChange={(e) =>
                          handleRadio(e.target.value, proposal._id)
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
                        // key={"radio2" + index}
                        name={`proposalStatus_forDisapproval${proposal._id}`}
                        type="radio"
                        value="Disapproved"
                        checked={proposal.reviewerStatus === "Disapproved"}
                        onChange={(e) =>
                          handleRadio(e.target.value, proposal._id)
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
    </Box>
  );
}

export default ReviewerGroupProposals;

// import React, { useState } from "react";
// import { Button, Modal, TextField, Typography } from "@mui/material";

// const CommentsModal = () => {
//   const [open, setOpen] = useState(false);
//   const [comments, setComments] = useState([]);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const comment = e.target.comment.value;
//     setComments([...comments, comment]);
//     e.target.reset();
//   };

//   return (
//     <div>
//       <Button variant="contained" onClick={handleOpen}>
//         Open Modal
//       </Button>

//       <Modal open={open} onClose={handleClose}>
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             Comments
//           </Typography>

//           <div>
//             {comments.map((comment, index) => (
//               <Typography key={index} variant="body1" gutterBottom>
//                 {comment}
//               </Typography>
//             ))}
//           </div>

//           <form onSubmit={handleSubmit}>
//             <TextField
//               name="comment"
//               label="Add a comment"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//             />

//             <Button type="submit" variant="contained" color="primary">
//               Add Comment
//             </Button>
//           </form>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default CommentsModal;
