import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTasks } from "../../api/api";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { formatDate2, formatTimeAMPM2 } from "../../utils/common-utils";
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
    <Box>
      <Typography>Name: {location.state.name}</Typography>
      <Box>
        <Typography>Completed Tasks</Typography>

        {tasks &&
          tasks.map((value, index) => {
            if (value.taskStatus == "Completed") {
              return (
                <Box key={index}>
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
      <Box>
        <Typography>Pending Tasks</Typography>
        {tasks &&
          tasks.map((value, index) => {
            if (value.taskStatus == "Pending") {
              return (
                <Box key={index}>
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
      <Button onClick={navigateAssignTask}>Assign New Task</Button>
    </Box>
  );
}

export default StudentDetails;
