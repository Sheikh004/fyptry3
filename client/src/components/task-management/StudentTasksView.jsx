import { Box, Typography, Button, Modal } from "@mui/material";
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
    <Box sx={{ display: "flex", height: "100vh", background: "lightgrey" }}>
      <Box sx={{ width: "20%", backgroundColor: "#28282B" }}>
        <NavBar />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            padding: "20px",
            width: "100%",
            margin: "20px auto",
            marginBottom: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px green",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "10px",
              fontFamily: "bold",
              color: "white",
              bgcolor: "green",
              borderRadius: "10px",
              padding: "5px",
            }}
            variant="h4"
          >
            Completed Tasks
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                  align="center"
                >
                  Due Date
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Approval Status
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
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
                        <TableCell>{value.title}</TableCell>
                        <TableCell align="center">
                          Due: {formatDate2(value.deadline)},{" "}
                          {formatTimeAMPM2(value.deadline)}
                        </TableCell>
                        <TableCell>{value.taskApproval}</TableCell>
                        <TableCell>
                          <IconButton
                            title="view"
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
            bgcolor: "white",
            color: "black",
            padding: "20px",
            width: "100%",
            margin: "auto",
            marginTop: "20px",
            boxShadow: "0 2px 4px red",
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "10px",
              fontFamily: "bold",
              color: "white",
              bgcolor: " #FF0000",
              borderRadius: "10px",
            }}
            variant="h4"
          >
            Pending Tasks
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    paddingLeft: "120px",
                  }}
                >
                  Due Date
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
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
                          <Typography variant="bold">{value.title}</Typography>
                        </TableCell>
                        <TableCell sx={{ paddingLeft: "120px" }} align="center">
                          Due: {formatDate2(value.deadline)},{" "}
                          {formatTimeAMPM2(value.deadline)}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            title="view"
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
    </Box>
  );
}

export default StudentTasksView;
