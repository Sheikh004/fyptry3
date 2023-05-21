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
function Submission(props) {
  const [proposal, setProposal] = useState();
  const [proposalPath, setProposalPath] = useState();
  const { user } = useContext(ChatContext);
  const [group, setGroup] = useState();
  const [notification, setNotification] = useState("");
  const [noti, setNoti] = useState(false);
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
        setNotification(data2.message);
        setNoti(!noti);
      }
    };
    makeProposal();
  }, [proposalPath, group]);
  useEffect(() => {
    const handleNotification = async () => {
      if (notification) {
        console.log(notification);
        const notif = await createNotification({
          notification: notification,
          createdBy: group._id,
          createdFor: group.supervisorId,
        });
        console.log(notif);
      }
    };
    handleNotification();
  }, [notification, noti]);
  return (
    <div style={{ backgroundColor: "#0490db", minHeight: "100vh" }}>
      <NavBar />
      <div
        style={{
          backgroundColor: "#052f72",
          width: "400px",
          margin: "0 auto",
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ color: "white" }}>FYP Proposal</h1>
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
              Delete
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
  );
}

export default Submission;
