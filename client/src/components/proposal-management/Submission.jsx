import React, { useEffect, useState, useContext } from "react";
import NavBar from "../NavBar";
import { uploadFile, getGroup, createProposal } from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
function Submission(props) {
  const [proposal, setProposal] = useState();
  const [proposalPath, setProposalPath] = useState();
  const { user } = useContext(ChatContext);
  const [group, setGroup] = useState();
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
      if (proposalPath && group) {
        const data2 = await createProposal({
          groupsId: group._id,
          supervisorsId: group.supervisorId,
          proposalsPath: proposalPath,
        });
        console.log(data2);
      }
    };
    makeProposal();
  }, [proposalPath, group]);

  return (
    <div style={{ backgroundColor: "#0b2b40", minHeight: "100vh" }}>
      <NavBar />
      <h1 style={{ color: "white", textAlign: "center", marginTop: 80 }}>
        FYP Proposal
      </h1>
      <div
        style={{
          backgroundColor: "#81007f",
          width: "400px",
          height: "200px",
          margin: "0 auto",
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form method="post" encType="multipart/form-data">
          <label htmlFor="fileInput2">Upload</label>
          <input
            type="file"
            name="files"
            style={{ display: "none" }}
            id="fileInput2"
            onChange={(e) => onFileChange(e)}
          />
          <br />
          <br />
          <button
            type="submit"
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
        </form>
      </div>
    </div>
  );
}

export default Submission;
