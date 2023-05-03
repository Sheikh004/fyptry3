import React, { useEffect, useState, useContext } from "react";
import NavBar from "../NavBar";
import { uploadFile } from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
function Submission(props) {
  const [proposal, setProposal] = useState();
  const [proposalPath, setProposalPath] = useState();
  const { user } = useContext(ChatContext);
  const onFileChange = (e) => {
    setProposal(e.target.files[0]);
  };
  useEffect(() => {
    const uploadProposal = async () => {
      console.log(proposal);
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
      if (proposalPath) {
        const data2 = await createProposal({});
      }
    };
  });

  return (
    <div>
      <NavBar />
      <p>FYP Proposal</p>
      <label htmlFor="fileInput2">Upload</label>
      <form method="post" encType="multipart/form-data">
        <input
          type="file"
          name="files"
          style={{ display: "none" }}
          id="fileInput2"
          onChange={(e) => onFileChange(e)}
        />
      </form>
    </div>
  );
}

export default Submission;
