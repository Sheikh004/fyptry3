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
    <Box sx={{ display: "flex", height: "100vh", background: "lightgrey" }}>
      <Box sx={{ width: "20%", backgroundColor: "#28282B" }}>
        <NavBar />
      </Box>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: "10px",
          color: "black",
          padding: "20px",
          width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
          margin: "20px auto",
          marginBottom: "10px",
          maxWidth: { xs: "100%", sm: "90%", md: "70%", lg: "50%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "20px",
          }}
        >
          <Typography variant="h4">"{location.state.title}"</Typography>
          <Typography>
            {formatDate2(location.state.deadline)} -{" "}
            {formatTimeAMPM2(location.state.deadline)}
          </Typography>
        </Box>

        <Typography style={{ paddingTop: "30px", paddingBottom: "30px" }}>
          Description: {location.state.description}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user.type === "Student" &&
            tasks &&
            tasks.taskStatus === "Pending" && (
              <Box sx={{ marginRight: "10px" }}>
                <label htmlFor="fileInput">
                  <Button
                    component="span"
                    variant="contained"
                    color="primary"
                    style={{ cursor: "pointer" }}
                  >
                    Upload
                  </Button>
                </label>
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

          {user.type === "Student" &&
            tasks &&
            tasks.taskStatus === "Pending" && (
              <Button
                onClick={handleUploadTask}
                variant="contained"
                color="primary"
                style={{ marginLeft: "10px" }}
              >
                Submit Task
              </Button>
            )}

          {user.type === "Student" &&
            tasks &&
            tasks.taskStatus === "Completed" && (
              <Button
                onClick={handleUnUploadTask}
                variant="contained"
                color="primary"
                style={{ marginLeft: "10px" }}
              >
                Unsubmit Task
              </Button>
            )}

          <Box>
            {tasks &&
              tasks.filespaths.length !== 0 &&
              tasks.filespaths.map((task, index) => {
                return (
                  <Box key={index}>
                    <Link href={task} target="_blank" rel="noopener">
                      {task.split("--").pop()}
                    </Link>
                    {tasks.taskStatus === "Pending" && (
                      <Button
                        key={"remove file" + index}
                        onClick={() => {
                          handleRemoveFile(tasks._id, task);
                        }}
                        style={{ marginLeft: "10px" }}
                      >
                        Delete
                      </Button>
                    )}
                  </Box>
                );
              })}
          </Box>
        </Box>
        {/* 
        <Box sx={{ backgroundColor: "white", paddingTop: "200px" }}>
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
                        variant="contained"
                        sx={{ backgroundColor: "primary.main" }}
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
        </Box> */}
      </Box>
    </Box>
  );
}

export default ViewTask;
