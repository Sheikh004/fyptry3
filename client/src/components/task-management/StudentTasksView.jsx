import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { fetchTasks } from "../../api/api";
import { formatDate2, formatTimeAMPM2 } from "../../utils/common-utils";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
function StudentTasksView(props) {
  const { user } = useContext(ChatContext);
  const [studentTasks, setStudentTasks] = useState();
  const navigate = useNavigate();
  const handleTaskViewRoute = (task) => {
    navigate("/view-task", { state: task });
  };
  useEffect(() => {
    const fetchTask = async () => {
      let data = await fetchTasks({
        assignedTo: user.id,
        groupId: user.groupId,
      });
      setStudentTasks(data);
    };
    fetchTask();
  }, [navigate]);
  return (
    <Box sx={{ bgcolor: "#0B2B40", color: "white", minHeight: "100vh" }}>
      <NavBar />

      <Box
        sx={{
          bgcolor: "purple",
          color: "white",
          padding: "20px",
          width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
          margin: "20px auto",
          marginBottom: "20px",
          maxWidth: { xs: "100%", sm: "90%", md: "70%", lg: "50%" },
        }}
      >
        <h2>Completed Tasks</h2>
        {console.log(user)}
        {studentTasks &&
          studentTasks.map((value, index) => {
            if (value.taskStatus == "Completed") {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "10px",
                  }}
                >
                  <Typography key={"title" + index}>{value.title}</Typography>

                  <Typography key={"deadline" + index}>
                    Date: {formatDate2(value.deadline)}
                    Time: {formatTimeAMPM2(value.deadline)}
                  </Typography>
                  <Button
                    key={"button" + index}
                    onClick={() => handleTaskViewRoute(value)}
                  >
                    View
                  </Button>
                </Box>
              );
            }
          })}
      </Box>
      <Box
        sx={{
          bgcolor: "purple",
          color: "white",
          padding: "20px",
          width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
          margin: "auto",
          marginTop: "20px",
          maxWidth: { xs: "100%", sm: "90%", md: "70%", lg: "50%" },
        }}
      >
        <h2>Pending Tasks</h2>
        {studentTasks &&
          studentTasks.map((value, index) => {
            if (value.taskStatus == "Pending") {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "10px",
                  }}
                >
                  <Typography key={"title" + index}>{value.title}</Typography>

                  <Typography key={"deadline" + index}>
                    Date: {formatDate2(value.deadline)}
                    Time: {formatTimeAMPM2(value.deadline)}
                  </Typography>
                  <Button
                    key={index}
                    onClick={() => handleTaskViewRoute(value)}
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

export default StudentTasksView;
