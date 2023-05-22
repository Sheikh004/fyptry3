import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTasks } from "../../api/api";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { formatDate2, formatTimeAMPM2 } from "../../utils/common-utils";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
function StudentDetails(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(ChatContext);
  const [tasks, setTasks] = useState();
  const handleNavigateToStudentTask = (value) => {
    navigate("/sup-eva-view-task", { state: value });
  };

  useEffect(() => {
    const getTask = async () => {
      let data = await getTasks({
        assignedBy: user.id,
        assignedTo: location.state._id,
      });
      setTasks(data);
    };
    getTask();
  }, [location.state._id, user.id]);
  return (
    <Box sx={{ bgcolor: "#0490db", color: "white", minHeight: "100vh" }}>
      <SupervisorNavbar />
      <br />
      {/* <Typography>Name: {location.state.name}</Typography> */}

      <Box sx={{ bgcolor: "#052f72", padding: "20px", marginBottom: "10px" }}>
        <Typography variant="h6">Completed Tasks</Typography>

        {tasks &&
          tasks.map((value, index) => {
            if (
              value.taskStatus === "Completed" &&
              value.taskApproval === "Approved"
            ) {
              return (
                <Box key={index} sx={{ marginBottom: "10px" }}>
                  <Typography variant="body1" sx={{ marginBottom: "5px" }}>
                    "{value.title}"
                  </Typography>

                  <Typography variant="body2" sx={{ marginBottom: "5px" }}>
                    Date: {formatDate2(value.deadline)} | Time:{" "}
                    {formatTimeAMPM2(value.deadline)}
                  </Typography>

                  <Button
                    onClick={() => {
                      handleNavigateToStudentTask(value);
                    }}
                    variant="outlined"
                    sx={{
                      bgcolor: "white",
                      color: "#052f72",
                      border: "1px solid #052f72",
                      borderRadius: "4px",
                      padding: "8px 16px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        bgcolor: "#052f72",
                        color: "white",
                      },
                    }}
                  >
                    View
                  </Button>
                </Box>
              );
            }
          })}
      </Box>

      <Box sx={{ bgcolor: "#052f72", padding: "20px", marginBottom: "10px" }}>
        <Typography variant="h6">Pending Tasks</Typography>

        {tasks &&
          tasks.map((value, index) => {
            if (value.taskStatus === "Pending") {
              return (
                <Box key={index} sx={{ marginBottom: "10px" }}>
                  <Typography variant="body1" sx={{ marginBottom: "5px" }}>
                    "{value.title}"
                  </Typography>

                  <Typography variant="body2" sx={{ marginBottom: "5px" }}>
                    Date: {formatDate2(value.deadline)} | Time:{" "}
                    {formatTimeAMPM2(value.deadline)}
                  </Typography>

                  <Button
                    onClick={() => {
                      handleNavigateToStudentTask(value);
                    }}
                    variant="outlined"
                    sx={{
                      bgcolor: "white",
                      color: "#052f72",
                      border: "1px solid #052f72",
                      borderRadius: "4px",
                      padding: "8px 16px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        bgcolor: "#052f72",
                        color: "white",
                      },
                    }}
                  >
                    View
                  </Button>
                </Box>
              );
            }
          })}
      </Box>
      <Box sx={{ bgcolor: "#052f72", padding: "20px", marginBottom: "10px" }}>
        <Typography variant="h6">Unapproved Tasks</Typography>

        {tasks &&
          tasks.map((value, index) => {
            if (
              value.taskStatus === "Completed" &&
              (value.taskApproval === "Pending" ||
                value.taskApproval === "Disapproved")
            ) {
              return (
                <Box key={index} sx={{ marginBottom: "10px" }}>
                  <Typography variant="body1" sx={{ marginBottom: "5px" }}>
                    "{value.title}"
                  </Typography>

                  <Typography variant="body2" sx={{ marginBottom: "5px" }}>
                    Date: {formatDate2(value.deadline)} | Time:{" "}
                    {formatTimeAMPM2(value.deadline)}
                  </Typography>

                  <Button
                    onClick={() => {
                      handleNavigateToStudentTask(value);
                    }}
                    variant="outlined"
                    sx={{
                      bgcolor: "white",
                      color: "#052f72",
                      border: "1px solid #052f72",
                      borderRadius: "4px",
                      padding: "8px 16px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        bgcolor: "#052f72",
                        color: "white",
                      },
                    }}
                  >
                    View
                  </Button>
                </Box>
              );
            }
          })}
      </Box>
    </Box>
  );
}

export default StudentDetails;
