import { Box, Typography, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { formatDate2, formatTimeAMPM2 } from "../../utils/common-utils";
import { useLocation } from "react-router-dom";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
function SupEvaViewTask(props) {
  const location = useLocation();
  const [supEvaTask, setSupEvaTask] = useState();
  useEffect(() => {
    setSupEvaTask(location.state);
  }, []);
  return (
    <Box>
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
        </Box>
      </Box>
    </Box>
  );
}

export default SupEvaViewTask;
