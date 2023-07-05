import React, { useEffect, useState, useContext } from "react";
import NavBar from "../NavBar";

import {
  uploadFile,
  getGroup,
  createProposal,
  createNotification,
  removeProposal,
  getGroupProposal,
  getGroupComments,
} from "../../api/api";
import { formatDate2, formatTimeAMPM2 } from "../../utils/common-utils";
import { ChatContext } from "../../context/ChatProvider";
import {
  Box,
  Button,
  ButtonBase,
  FormControlLabel,
  FormGroup,
  Link,
  Typography,
  Modal,
  Checkbox,
  TextField,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CancelIcon from "@mui/icons-material/Cancel";

function Submission(props) {
  const [proposal, setProposal] = useState();
  const [proposalPath, setProposalPath] = useState();
  const { user } = useContext(ChatContext);
  const [group, setGroup] = useState();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentProposalId, setCurrentProposalId] = useState();

  // const [notification, setNotification] = useState("");
  // const [noti, setNoti] = useState(false);
  const [fieldArray, setFieldArray] = useState([]);
  const [interestArray, setInterestArray] = useState([]);

  const [isDisabled, setIsDisabled] = useState();
  const [submittedProposal, setSubmittedProposal] = useState();
  const [isRemove, setIsRemove] = useState(false);
  const onFileChange = (e) => {
    setProposal(e.target.files[0]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckChange = (event) => {
    let { value, checked } = event.target;
    if (checked) {
      setInterestArray((prevInterestArray) => [...prevInterestArray, value]);
    } else {
      setInterestArray((prevInterestArray) =>
        prevInterestArray.filter((option) => option !== value)
      );
    }
  };
  const handleFieldChange = (event2) => {
    let { value, checked } = event2.target;
    if (checked) {
      setFieldArray((prevFieldArray) => [...prevFieldArray, value]);
    } else {
      setFieldArray((prevFieldArray) =>
        prevFieldArray.filter((option) => option !== value)
      );
    }
  };

  useEffect(() => {
    if (interestArray.length === 0) {
      setIsDisabled(true);
      // console.log("You need to atleast select 1 Area of Interest");
    }
    if (fieldArray.length === 0) {
      setIsDisabled(true);
      // console.log("You need to atleast select 1 Development Field");
    }
    if (interestArray.length > 0 && fieldArray.length > 0) {
      setIsDisabled(false);
    }
  }, [interestArray, fieldArray]);

  useEffect(() => {
    const getExistingProposal = async () => {
      if (group) {
        const proposal = await getGroupProposal(group._id);

        if (
          proposal.status === 200 &&
          proposal.data &&
          proposal.data.filepath
        ) {
          setProposalPath(proposal.data.filepath);
          setCurrentProposalId(proposal.data._id);
          setInterestArray(proposal.data.areaOfInterest);
          setFieldArray(proposal.data.developmentArea);
          console.log(proposal);
          // setCurrentPref(proposal.data.)
        }
      }
    };
    getExistingProposal();
  }, [group]);

  useEffect(() => {
    const fetchGroupComments = async () => {
      if (currentProposalId) {
        const gComments = await getGroupComments(currentProposalId);
        // console.log(gComments);
        if (gComments.status === 200) {
          setComments(gComments.data);
        }
      }
    };
    fetchGroupComments();
  }, [currentProposalId]);

  useEffect(() => {
    const handleRemoval = async () => {
      if (submittedProposal && isRemove === true) {
        console.log(submittedProposal._id, submittedProposal.filepath);
        const response = await removeProposal(
          submittedProposal._id,
          submittedProposal.filepath
        );
        if (response) {
          console.log(response);
          setIsRemove(false);
          setProposal(null);
          setProposalPath("");
          setCurrentProposalId("");
        }
      }
    };
    handleRemoval();
  }, [submittedProposal, isRemove]);

  useEffect(() => {
    const findGroup = async () => {
      const data0 = await getGroup(user.id);
      console.log(data0);
      setGroup(data0);
    };
    findGroup();
  }, []);
  useEffect(() => {
    const uploadProposal = async () => {
      //   console.log(proposal);
      if (proposal) {
        const data = new FormData();
        data.append("file", proposal);

        const response = await uploadFile(data);
        if (response && response.data);
        // console.log(response);
        setProposalPath(response.data);
      }
    };
    uploadProposal();
  }, [proposal]);
  useEffect(() => {
    const makeProposal = async () => {
      if (proposalPath && group) {
        const data2 = await createProposal({
          groupsId: group._id,
          groupName: group.name,
          supervisorsId: group.supervisorId,
          proposalsPath: proposalPath,
          developmentArea: fieldArray,
          areaOfInterest: interestArray,
        });
        setSubmittedProposal(data2.proposal);
        setCurrentProposalId(data2.proposal._id);
        // setNotification(data2.message);
        // setNoti(!noti);
      }
    };
    makeProposal();
  }, [proposalPath, group]);
  // useEffect(() => {
  //   const handleNotification = async () => {
  //     if (notification) {
  //       console.log(notification);
  //       const notif = await createNotification({
  //         notification: notification,
  //         createdBy: group._id,
  //         createdFor: group.supervisorId,
  //       });
  //       console.log(notif);
  //     }
  //   };
  //   handleNotification();
  // }, [notification, noti]);
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ width: "20%", backgroundColor: "#28282B" }}>
        <NavBar />
      </Box>
      <div
        style={{
          backgroundColor: "lightgray",
          minHeight: "100vh",
          width: "80%",
        }}
      >
        <div
          style={{
            gcolor: "white",
            color: "black",
            // padding: "20px",
            width: "90%",
            height: "95%",
            margin: "auto",
            marginTop: "1%",
            boxShadow: "0 2px 4px #28282B",
            borderRadius: "10px",
            // justifyContent: "center",
            // alignItems: "center",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
            paddingTop: "25px",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          <h4>Project Details</h4>

          <h5>Area of Interest </h5>
          <Box sx={{ marginTop: "2%" }}>
            {interestArray.length === 0 && (
              <Typography>Please check atleast 1 Area of Interest</Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "auto",
              height: "auto",
              padding: "1%",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  value="machine-learning"
                  onChange={handleCheckChange}
                  checked={interestArray.includes("machine-learning")}
                />
              }
              label="Machine Learning"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="augmented-reality"
                  onChange={handleCheckChange}
                  checked={interestArray.includes("augmented-reality")}
                />
              }
              label="Augmented Reality"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="e-commerce"
                  onChange={handleCheckChange}
                  checked={interestArray.includes("e-commerce")}
                />
              }
              label="E-Commerce"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="image-processing"
                  onChange={handleCheckChange}
                  checked={interestArray.includes("image-processing")}
                />
              }
              label="Image Processing"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "auto",
              height: "auto",
              padding: "1%",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  value="natural-language-processing"
                  onChange={handleCheckChange}
                  checked={interestArray.includes(
                    "natural-language-processing"
                  )}
                />
              }
              label="Natural Language Processing"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="web-3"
                  onChange={handleCheckChange}
                  checked={interestArray.includes("web-3")}
                />
              }
              label="Web 3.0"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="virtual-reality"
                  onChange={handleCheckChange}
                  checked={interestArray.includes("virtual-reality")}
                />
              }
              label="Virtual Reality"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="game-development"
                  onChange={handleCheckChange}
                  checked={interestArray.includes("game-development")}
                />
              }
              label="Game Development"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "auto",
              height: "auto",
              paddingBottom: "3%",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  value="other"
                  onChange={handleCheckChange}
                  checked={interestArray.includes("other")}
                />
              }
              label="Other"
            />
          </Box>
          <h5>Development Area</h5>
          <Box sx={{ marginTop: "2%" }}>
            {fieldArray.length === 0 && (
              <Typography>Please check atleast 1 Development Field</Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "auto",
              height: "auto",
              padding: "1%",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  value="mobile-application-development"
                  onChange={handleFieldChange}
                  checked={fieldArray.includes(
                    "mobile-application-development"
                  )}
                />
              }
              label="Mobile Application Development"
            />
            {/* {console.log(currentDA.includes("mobile-application-development"))} */}
            <FormControlLabel
              control={
                <Checkbox
                  value="system-application-development"
                  onChange={handleFieldChange}
                  checked={fieldArray.includes(
                    "system-application-development"
                  )}
                />
              }
              label="System Application Development"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="web-development"
                  onChange={handleFieldChange}
                  checked={fieldArray.includes("web-development")}
                />
              }
              label="Web Development"
            />
          </Box>
          <h4 style={{ color: "Black", borderRadius: "5px" }}>FYP Proposal</h4>
          <br />
          {proposalPath && (
            <Box>
              <Link href={proposalPath} target="_blank" rel="noopener">
                {proposalPath.split("--").pop()}
              </Link>
              <Button
                onClick={() => {
                  setIsRemove(true);
                }}
              >
                <CancelIcon style={{ color: "red" }} />
              </Button>
            </Box>
          )}

          <form
            method="post"
            disabled={false}
            encType="multipart/form-data"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="fileInput2"
              style={{
                backgroundColor: "#0490db",
                marginRight: "10px",
                color: "white",
                padding: "8px 16px",
                borderRadius: "4px",
              }}
            >
              <FileUploadIcon
                style={{
                  marginRight: "4px",
                }}
              />
              Upload
            </label>
            <input
              type="file"
              name="files"
              disabled={isDisabled}
              style={{ display: "none" }}
              id="fileInput2"
              onChange={(e) => onFileChange(e)}
            />
            <br />
            <br />
          </form>

          {proposalPath && <Button onClick={handleOpen}>View Comments</Button>}

          <Modal
            open={open}
            onClose={handleClose}
            style={{
              overflowY: "auto",
              height: "50%",
              width: "80%",
            }}
          >
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
                      {comment.senderId === group.supervisorId ? (
                        <Typography key={"sup" + index}>Supervisor</Typography>
                      ) : (
                        <Typography key={"rev" + index}>Reviewer</Typography>
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
                    </Box>
                  ))}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </Box>
  );
}

export default Submission;
