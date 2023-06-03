import {
  Box,
  Button,
  Typography,
  styled,
  Input,
  Link,
  TextField,
} from "@mui/material";
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
  getGroupComments,
  deleteComment,
  createTaskComment,
} from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
import NavBar from "../NavBar";
function ViewTask(props) {
  const location = useLocation();
  const [taskFiles, setTaskFiles] = useState();
  const [commentValue, setCommentValue] = useState("");
  const [tasks, setTasks] = useState();
  const [submit, setSubmit] = useState(false);
  const [comments, setComments] = useState([]);
  const [refresh2, setRefresh2] = useState(false);
  const { user } = useContext(ChatContext);

  useEffect(() => {
    const sendComment = async () => {
      if (submit === true && commentValue !== "") {
        const result = await createTaskComment({
          fid: user.id,
          pid: location.state._id,
          commentText: commentValue,
        });
        setSubmit(false);
        setCommentValue("");
        setRefresh2(!refresh2);
      } else setSubmit(false);
    };
    sendComment();
  }, [submit]);

  useEffect(() => {
    setTasks(location.state);
    const fetchGroupComments = async () => {
      const data = await getGroupComments(location.state._id);

      if (data) {
        setComments(data.data);
      }
    };
    fetchGroupComments();
  }, [location, refresh2]);

  const handleDeleteComment = async (cid) => {
    const deleteResult = await deleteComment(cid);
    if (deleteResult) setRefresh2(!refresh2);
  };

  const handleUnUploadTask = async () => {
    let data3 = await setPendingTask({ id: location.state._id });
    setTasks(data3);
  };

  const handleUploadTask = async () => {
    let result2 = await setCompletedTask({
      id: location.state._id,
    });
    setTasks(result2);
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
      {console.log(tasks)}
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
      <Box sx={{ backgroundColor: "white" }}>
        <Typography sx={{ color: "black" }}>Comments</Typography>
        <Box>
          <div>
            {comments.length !== 0 &&
              comments.map((comment, index) => (
                <Box key={"Box" + index}>
                  {comment.senderId === user.id && (
                    <Typography color="black">{user.type}</Typography>
                  )}
                  <Typography
                    key={"text" + index}
                    variant="body1"
                    gutterBottom
                    color="black"
                  >
                    {comment.text}
                  </Typography>
                  <Typography key={"time" + index} color="black">
                    {formatTimeAMPM2(comment.createdAt)},
                    {formatDate2(comment.createdAt)}
                  </Typography>
                  {comment.senderId === user.id && (
                    <Button
                      key={"delete" + index}
                      onClick={() => {
                        handleDeleteComment(comment._id);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              ))}
          </div>

          <TextField
            name="comment"
            label="Add a comment"
            variant="outlined"
            fullWidth
            value={commentValue}
            margin="normal"
            onChange={(e) => {
              setCommentValue(e.target.value);
            }}
          ></TextField>
          <Button
            onClick={() => {
              setSubmit(true);
            }}
            variant="contained"
            color="primary"
          >
            Add comment
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ViewTask;
