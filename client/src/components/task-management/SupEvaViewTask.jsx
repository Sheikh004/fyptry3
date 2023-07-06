import { Box, Typography, Link, Button, TextField } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { formatDate2, formatTimeAMPM2 } from "../../utils/common-utils";
import { useLocation } from "react-router-dom";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
import {
  updateTaskApproval,
  deleteComment,
  createTaskComment,
  getGroupComments,
} from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
function SupEvaViewTask(props) {
  const location = useLocation();
  const [supEvaTask, setSupEvaTask] = useState();
  const [submit, setSubmit] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [refresh2, setRefresh2] = useState(false);
  const { user } = useContext(ChatContext);
  useEffect(() => {
    setSupEvaTask(location.state);
    const fetchGroupComments = async () => {
      const data = await getGroupComments(location.state._id);

      if (data) {
        setComments(data.data);
      }
    };
    fetchGroupComments();
  }, [location, refresh2]);

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

  const handleDeleteComment = async (cid) => {
    const deleteResult = await deleteComment(cid);
    if (deleteResult) setRefresh2(!refresh2);
  };

  const handleRadio = async (value, taskId) => {
    const data = await updateTaskApproval(value, taskId);
    // console.log(data.data.data);
    if (data.status === 200);
    setSupEvaTask(data.data.data);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", background: "lightgrey" }}>
      <Box sx={{ width: "20%", backgroundColor: "#28282B" }}>
        <SupervisorNavbar />
      </Box>
      <Box
        sx={{
          bgcolor: "lightgrey",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
        }}
      >
        <Box
          sx={{
            bgcolor: "White",
            marginTop: "10px",
            padding: "20px",
            textAlign: "center",
            width: "80%",
            maxWidth: "800px",
            color: "black",
            borderRadius: "10px",
            boxShadow: "0px 2px 4px black",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                marginBottom: "10px",
                marginTop: "10px",
                textDecoration: "underline",
              }}
            >
              {location.state.title}
            </Typography>

            <Typography sx={{ fontSize: "14px" }}>
              Due: {formatDate2(location.state.deadline)},{" "}
              {formatTimeAMPM2(location.state.deadline)}
            </Typography>
          </Box>

          <Typography
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
              textAlign: "left",
              padding: "10px",
              border: "1px solid black",
              padding: "10px",
              borderRadius: "7px",
              paddingBottom: "50px",
            }}
          >
            Description: {location.state.description}
          </Typography>

          <Box
            sx={{
              marginTop: "10px",
              textAlign: "center",
              bgcolor: "white",
              padding: "10px",
              width: "80%",
              maxWidth: "500px",
              color: "black",
            }}
          >
            {supEvaTask &&
              supEvaTask.taskStatus === "Completed" &&
              supEvaTask.filespaths.length !== 0 &&
              supEvaTask.filespaths.map((task, index) => {
                return (
                  <Link
                    href={task}
                    target="_blank"
                    rel="noopener"
                    key={index}
                    sx={{
                      color: "white",
                      textDecoration: "underline",
                      marginBottom: "5px",
                      display: "block",
                    }}
                  >
                    {task.split("--").pop()}
                  </Link>
                );
              })}
            {supEvaTask &&
              supEvaTask.taskStatus === "Completed" &&
              supEvaTask.filespaths.length !== 0 &&
              user.type === "Supervisor" && (
                <div>
                  <label>
                    <input
                      key={"radio1"}
                      type="radio"
                      value="Approved"
                      checked={supEvaTask.taskApproval === "Approved"}
                      onChange={(e) =>
                        handleRadio(e.target.value, supEvaTask._id)
                      }
                    />
                    Approve
                  </label>
                  <label>
                    <input
                      key={"radio2"}
                      type="radio"
                      value="Disapproved"
                      checked={supEvaTask.taskApproval === "Disapproved"}
                      onChange={(e) =>
                        handleRadio(e.target.value, supEvaTask._id)
                      }
                    />
                    Disapprove
                  </label>
                </div>
              )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SupEvaViewTask;
