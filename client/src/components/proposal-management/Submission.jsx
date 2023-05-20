import React, { useEffect, useState, useContext } from "react";
import NavBar from "../NavBar";
import {
  uploadFile,
  getGroup,
  createProposal,
  createNotification,
} from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
function Submission(props) {
  const [proposal, setProposal] = useState();
  const [proposalPath, setProposalPath] = useState();
  const { user } = useContext(ChatContext);
  const [group, setGroup] = useState();
  const [notification, setNotification] = useState("");
  const [noti, setNoti] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(false);
  const onFileChange = (e) => {
    setProposal(e.target.files[0]);
  };
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
        // console.log(response.data);
        setProposalPath(response.data);
      }
    };
    uploadProposal();
  }, [proposal]);
  useEffect(() => {
    const makeProposal = async () => {
      if (proposalPath && group && submissionStatus === true) {
        const data2 = await createProposal({
          groupsId: group._id,
          groupName: group.name,
          supervisorsId: group.supervisorId,
          proposalsPath: proposalPath,
        });
        console.log(data2.proposal);
        setNotification(data2.message);
        setNoti(!noti);
        setSubmissionStatus(false);
      }
    };
    makeProposal();
  }, [proposalPath, group, submissionStatus]);
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

          {/* {/* {proposalPath && <p>{proposalPath}</p>} */}
        </form>
        <button
          onClick={() => {
            setSubmissionStatus(true);
          }}
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: 10,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "white";
            e.target.style.color = "black";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "black";
            e.target.style.color = "white";
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Submission;
