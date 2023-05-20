import { Box, Button, Typography, styled, Input, Link } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { formatDate2, formatTimeAMPM2 } from "../../utils/common-utils";
import {
  handleUploadTasks,
  updateTask,
  setPendingTask,
  setCompletedTask,
  removeFile,
} from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
import NavBar from "../NavBar";
function ViewTask(props) {
  const location = useLocation();
  const [taskFiles, setTaskFiles] = useState();

  const [tasks, setTasks] = useState();

  const { user } = useContext(ChatContext);

  useEffect(() => {
    setTasks(location.state);
  }, [location]);

  const handleUnUploadTask = async () => {
    let data3 = await setPendingTask({ id: location.state._id });
    setTasks(data3);
    console.log(data3);
  };

  const handleUploadTask = async () => {
    let result2 = await setCompletedTask({
      id: location.state._id,
    });
    setTasks(result2);

    console.log(result2);
  };

  const onFileChange = async (e) => {
    setTaskFiles(e.target.files);
  };

  useEffect(() => {
    const uploadTaskFiles = async () => {
      if (taskFiles) {
        const formData = new FormData();

        let filesKeys = Object.keys(taskFiles);
        for (let key in filesKeys) {
          formData.append("files", taskFiles[key]);
        }
        formData.append("files", taskFiles);
        console.log(formData);

        let data2 = await handleUploadTasks(formData);
        if (data2 && data2 !== "") {
          let result = await updateTask({
            id: location.state._id,
            filesNameArr: data2,
          });
          setTasks(result);

          console.log(result);
        }
      }
    };
    uploadTaskFiles();
  }, [taskFiles]);

  const handleRemoveFile = async (task_id, file_name) => {
    const data = await removeFile(task_id, file_name);
    if (data) setTasks(data);
  };

  return (
    <Box sx={{ bgcolor: "#0B2B40", color: "white", minHeight: "100vh" }}>
      <NavBar />
      <Box
        sx={{
          bgcolor: "#6A0572",
          color: "white",
          padding: "20px",
          width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
          margin: "20px auto",
          marginBottom: "10px",
          maxWidth: { xs: "100%", sm: "90%", md: "70%", lg: "50%" },
        }}
      >
        <Typography variant="h6">Title</Typography>
        <Typography>{location.state.title}</Typography>
        <Typography variant="h6">Description</Typography>
        <Typography>{location.state.description}</Typography>
        <Typography variant="h6">Due Date</Typography>
        <Typography>Date: {formatDate2(location.state.deadline)}</Typography>
        <Typography>
          Time: {formatTimeAMPM2(location.state.deadline)}
        </Typography>
        {user.type === "Student" && tasks && tasks.taskStatus === "Pending" && (
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
        {user.type === "Student" && tasks && tasks.taskStatus === "Pending" && (
          <Button onClick={handleUploadTask}>Submit Task</Button>
        )}{" "}
        {user.type === "Student" &&
          tasks &&
          tasks.taskStatus === "Completed" && (
            <Button onClick={handleUnUploadTask}>Unsubmit Task</Button>
          )}
        <Box>
          {tasks &&
            tasks.filespaths.length !== 0 &&
            tasks.filespaths.map((task, index) => {
              return (
                <Box>
                  <Link href={task} target="_blank" rel="noopener" key={index}>
                    {task.split("--").pop()}
                  </Link>
                  {tasks.taskStatus === "Pending" && (
                    <Button
                      key={"remove file" + index}
                      onClick={() => {
                        handleRemoveFile(tasks._id, task);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}

export default ViewTask;
