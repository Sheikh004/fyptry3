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
  const navigateAssignTask = () => {
    navigate("/assign-task", { state: location.state });
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
    <Box sx={{ bgcolor: "#0B2B40", color: "white", minHeight: "100vh" }}>
      <SupervisorNavbar />
      <Typography>Name: {location.state.name}</Typography>
      <Box sx={{ bgcolor: "purple", padding: "20px", marginBottom: "10px" }}>
        <Typography>Completed Tasks</Typography>

        {tasks &&
          tasks.map((value, index) => {
            if (value.taskStatus == "Completed") {
              return (
                <Box key={index} sx={{ marginBottom: "10px" }}>
                  <Typography key={"title" + index}>{value.title}</Typography>

                  <Typography key={"deadline" + index}>
                    Date: {formatDate2(value.deadline)}
                    Time: {formatTimeAMPM2(value.deadline)}
                  </Typography>
                  <Button
                    key={"button" + index}
                    onClick={() => {
                      handleNavigateToStudentTask(value);
                    }}
                  >
                    View
                  </Button>
                </Box>
              );
            }
          })}
      </Box>
      <Box sx={{ bgcolor: "purple", padding: "20px", marginBottom: "10px" }}>
        <Typography>Pending Tasks</Typography>
        {tasks &&
          tasks.map((value, index) => {
            if (value.taskStatus == "Pending") {
              return (
                <Box key={index} sx={{ marginBottom: "10px" }}>
                  <Typography key={"title" + index}>{value.title}</Typography>

                  <Typography key={"deadline" + index}>
                    Date: {formatDate2(value.deadline)}
                    Time: {formatTimeAMPM2(value.deadline)}
                  </Typography>
                  <Button
                    key={"button" + index}
                    onClick={() => {
                      handleNavigateToStudentTask(value);
                    }}
                  >
                    View
                  </Button>
                </Box>
              );
            }
          })}
      </Box>
      <Button
        onClick={navigateAssignTask}
        sx={{
          bgcolor: "purple",
          color: "white",
          border: "1px solid white",
          borderRadius: "4px",
          padding: "8px 16px",
          fontWeight: "bold",
          textTransform: "uppercase",
          transition: "background-color 0.3s ease",
          "&:hover": {
            bgcolor: "white",
            color: "purple",
          },
        }}
      >
        Assign New Task
      </Button>
    </Box>
  );
}

export default StudentDetails;
