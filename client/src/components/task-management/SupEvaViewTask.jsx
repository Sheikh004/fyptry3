import { Box, Typography, Link } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { formatDate2, formatTimeAMPM2 } from "../../utils/common-utils";
import { useLocation } from "react-router-dom";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
import { updateTaskApproval } from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
function SupEvaViewTask(props) {
  const location = useLocation();
  const [supEvaTask, setSupEvaTask] = useState();
  const { user } = useContext(ChatContext);
  useEffect(() => {
    setSupEvaTask(location.state);
  }, []);

  const handleRadio = async (value, taskId) => {
    const data = await updateTaskApproval(value, taskId);
    // console.log(data.data.data);
    if (data.status === 200);
    setSupEvaTask(data.data.data);
  };

  return (
    <Box>
      {console.log(supEvaTask)}
      <SupervisorNavbar />
      <Box
        sx={{
          bgcolor: "#0490db",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "#052f72",
            marginTop: "10px",
            padding: "20px",
            textAlign: "center",
            width: "80%",
            maxWidth: "500px",
          }}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: "10px", fontWeight: "bold" }}
          >
            "{location.state.title}""
          </Typography>

          <Typography sx={{ marginTop: "10px", marginBottom: "10px" }}>
            Description: {location.state.description}
          </Typography>

          <Typography>
            Due: {formatDate2(location.state.deadline)},{" "}
            {formatTimeAMPM2(location.state.deadline)}
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: "10px",
            textAlign: "center",
            bgcolor: "#052f72",
            padding: "10px",
            width: "80%",
            maxWidth: "500px",
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
  );
}

export default SupEvaViewTask;
