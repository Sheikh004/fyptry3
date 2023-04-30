import { Box, Button, Typography, styled, Input, Link } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { formatDate2, formatTimeAMPM2 } from "../../utils/common-utils";
import { handleUploadTasks, updateTask, setPendingTask } from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
import NavBar from "../NavBar";
function ViewTask(props) {
  const location = useLocation();
  const [taskFiles, setTaskFiles] = useState();
  const [uploadedData, setUploadedData] = useState();
  const [tasks, setTasks] = useState();
  const { user } = useContext(ChatContext);

  useEffect(() => {
    setTasks(location.state);
  }, []);
  const handleUnUploadTask = async () => {
    let data3 = await setPendingTask({ id: location.state._id });
    setTasks(data3);
    console.log(data3);
    console.log(tasks);
  };

  const handleUploadTask = async () => {
    const formData = new FormData();

    let filesKeys = Object.keys(taskFiles);
    for (let key in filesKeys) {
      formData.append("files", taskFiles[key]);
    }
    formData.append("files", taskFiles);
    console.log(formData);

    let data2 = await handleUploadTasks(formData);
    if (data2) setUploadedData(data2);
  };
  useEffect(() => {
    const updatingTask = async () => {
      if (uploadedData) {
        let result = await updateTask({
          id: location.state._id,
          filesNameArr: uploadedData,
        });
        setTasks(result);
        console.log(result);
      }
    };
    updatingTask();
  }, [uploadedData]);
  const onFileChange = (e) => {
    setTaskFiles(e.target.files);
  };
  return (
    <Box>
      <NavBar />
      <Typography>Title</Typography>
      <Typography>{location.state.title}</Typography>
      <Typography>Description</Typography>
      <Typography>{location.state.description}</Typography>
      <Typography>Due Date</Typography>
      <Typography>Date: {formatDate2(location.state.deadline)}</Typography>
      <Typography>Time: {formatTimeAMPM2(location.state.deadline)}</Typography>
      {user.type === "Student" && tasks && tasks.taskStatus == "Pending" && (
        <Box>
          {" "}
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
        </Box>
      )}
      {user.type === "Student" && tasks && tasks.taskStatus == "Pending" && (
        <Button onClick={handleUploadTask}>Submit Task</Button>
      )}{" "}
      {user.type === "Student" && tasks && tasks.taskStatus == "Completed" && (
        <Button onClick={handleUnUploadTask}>Unsubmit Task</Button>
      )}
      <Box>
        {tasks &&
          tasks.filespaths.length !== 0 &&
          tasks.filespaths.map((task, index) => {
            return (
              <Link href={task} target="_blank" rel="noopener" key={index}>
                {task.split("--").pop()}
              </Link>
            );
          })}
      </Box>
    </Box>
  );
}

export default ViewTask;