import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { fetchTasks } from "../../api/api";
import { formatDate2, formatTimeAMPM2 } from "../../utils/common-utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Icon from "@mui/material/Icon";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <Box sx={{ bgcolor: "#0490db", color: "white", minHeight: "100vh" }}>
      <NavBar />

      <Box
        sx={{
          bgcolor: "#052f72",
          color: "white",
          padding: "20px",
          width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
          margin: "20px auto",
          marginBottom: "20px",
          maxWidth: { xs: "100%", sm: "90%", md: "70%", lg: "50%" },
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontFamily: "bold",
          }}
        >
          Completed Tasks
        </h2>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: "15px", fontWeight: "Bold", color: "white" }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{ fontSize: "15px", fontWeight: "Bold", color: "white" }}
                align="center"
              >
                Due Date
              </TableCell>
              <TableCell
                sx={{ fontSize: "15px", fontWeight: "Bold", color: "white" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentTasks &&
              studentTasks.map((value, index) => {
                if (value.taskStatus === "Completed") {
                  return (
                    <TableRow key={index}>
                      <TableCell sx={{ color: "white" }}>
                        {value.title}
                      </TableCell>
                      <TableCell sx={{ color: "white" }} align="center">
                        Due: {formatDate2(value.deadline)},{" "}
                        {formatTimeAMPM2(value.deadline)}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={() => handleTaskViewRoute(value)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
          </TableBody>
        </Table>
      </Box>

      <Box
        sx={{
          bgcolor: "#052f72",
          color: "white",
          padding: "20px",
          width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
          margin: "auto",
          marginTop: "20px",
          maxWidth: { xs: "100%", sm: "90%", md: "70%", lg: "50%" },
        }}
      >
        <Typography
          sx={{ textAlign: "center", marginBottom: "10px", fontFamily: "bold" }}
          variant="h4"
        >
          Pending Tasks
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: "15px", fontWeight: "Bold", color: "white" }}
              >
                Title
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: "15px",
                  fontWeight: "Bold",
                  paddingLeft: "120px",
                  color: "white",
                }}
              >
                Due Date
              </TableCell>
              <TableCell
                sx={{ fontSize: "15px", fontWeight: "Bold", color: "white" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentTasks &&
              studentTasks.map((value, index) => {
                if (value.taskStatus === "Pending") {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography sx={{ color: "white" }} variant="bold">
                          {value.title}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ color: "white", paddingLeft: "120px" }}
                        align="center"
                      >
                        Due: {formatDate2(value.deadline)},{" "}
                        {formatTimeAMPM2(value.deadline)}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={() => handleTaskViewRoute(value)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default StudentTasksView;
