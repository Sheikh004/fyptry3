import React, { useEffect, useState, useContext } from "react";
import NavBar from "../NavBar";
import {
  uploadFile,
  getGroup,
  createProposal,
  createNotification,
  removeProposal,
} from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
import { Box, Button, Link } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CancelIcon from "@mui/icons-material/Cancel";
function Submission(props) {
  const [proposal, setProposal] = useState();
  const [proposalPath, setProposalPath] = useState();
  const { user } = useContext(ChatContext);
  const [group, setGroup] = useState();
  // const [notification, setNotification] = useState("");
  // const [noti, setNoti] = useState(false);
  const [submittedProposal, setSubmittedProposal] = useState();
  const [isRemove, setIsRemove] = useState(false);
  const onFileChange = (e) => {
    setProposal(e.target.files[0]);
  };

  useEffect(() => {
    const handleRemoval = async () => {
      if (submittedProposal && isRemove === true) {
        console.log(submittedProposal._id, submittedProposal.filepath);
        const response = await removeProposal(
          submittedProposal._id,
          submittedProposal.filepath
        );
        if (response) console.log(response);
        setIsRemove(false);
        setProposal(null);
        setProposalPath("");
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
        });
        setSubmittedProposal(data2.proposal);
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
            padding: "20px",
            width: "50%",
            margin: "auto",
            marginTop: "20%",
            boxShadow: "0 2px 4px #28282B",
            borderRadius: "10px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          <h1 style={{ color: "Black", borderRadius: "5px", width: "100%" }}>
            FYP Proposal
          </h1>
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
              style={{ display: "none" }}
              id="fileInput2"
              onChange={(e) => onFileChange(e)}
            />
            <br />
            <br />
          </form>
        </div>
      </div>
    </Box>
  );
}

export default Submission;
