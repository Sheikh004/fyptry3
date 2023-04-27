import { Box, Button, Typography, styled, Input } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { formatDate2, formatTimeAMPM2 } from "../../utils/common-utils";
import { updateTask } from "../../api/api";
function ViewTask(props) {
  const location = useLocation();
  const [taskFiles, setTaskFiles] = useState();
  const [taskFilesNames, setTaskFilesNames] = useState("");
  const handleUploadTasks = async () => {
    const formData = new FormData();

    let filesKeys = Object.keys(taskFiles);
    for (let key in filesKeys) {
      formData.append("files", taskFiles[key]);
    }
    formData.append("files", taskFiles);
    console.log(formData);
    // const formData = new FormData();
    // taskFiles.forEach ((file) => {
    //   formData.append("files", file);
    // });
    let data2 = await updateTask({ id: location.state._id, files: formData });
    console.log(data2);
  };
  const onFileChange = (e) => {
    let array = [];
    setTaskFiles(e.target.files);
    let filesKeys = Object.keys(e.target.files);
    for (let key in filesKeys) {
      array.push(e.target.files[key].name);
    }
    setTaskFilesNames(array);
  };
  return (
    <Box>
      <Typography>Title</Typography>
      <Typography>{location.state.title}</Typography>
      <Typography>Description</Typography>
      <Typography>{location.state.description}</Typography>
      <Typography>Due Date</Typography>

      <Typography>Date: {formatDate2(location.state.deadline)}</Typography>
      <Typography>Time: {formatTimeAMPM2(location.state.deadline)}</Typography>
      <Typography>Upload Task</Typography>
      <label htmlFor="fileInput">Upload</label>
      <form method="post" encType="multipart/form-data">
        <input
          type="file"
          name="files"
          multiple
          style={{ display: "none" }}
          id="fileInput"
          onChange={(e) => onFileChange(e)}
        />
      </form>

      <Button onClick={handleUploadTasks}>Mark Task as Completed</Button>
    </Box>
  );
}

export default ViewTask;
