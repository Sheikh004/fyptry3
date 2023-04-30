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
      let data = await fetchTasks({ assignedTo: user.id });
      setStudentTasks(data);
    };
    fetchTask();
  });
  return (
    <Box>
      <NavBar />
      <Typography>Tasks</Typography>
      <Box>
        <Typography>Completed Tasks</Typography>

        {studentTasks &&
          studentTasks.map((value, index) => {
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
                    onClick={() => handleTaskViewRoute(value)}
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
        {studentTasks &&
          studentTasks.map((value, index) => {
            if (value.taskStatus == "Pending") {
              return (
                <Box key={index}>
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
