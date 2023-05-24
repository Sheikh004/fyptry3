import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
    <Box display="flex" backgroundColor="lightgrey" height="100vh">
      <Box style={{ width: "20%", backgroundColor: "#28282B" }}>
        <SupervisorNavbar />
      </Box>

      <Box
        sx={{
          bgcolor: "lightgrey",
          padding: "20px",
          marginBottom: "10px",
          width: "80%",
          height: "100%",
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            marginBottom: "20px",
            bgcolor: "white",
            padding: "20px",
            boxShadow: "0 2px 4px green",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              textAlign: "center",
              bgcolor: "green",
              padding: "5px",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            Completed Tasks
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Due
                </TableCell>

                <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks &&
                tasks.map((value, index) => {
                  if (
                    value.taskStatus === "Completed" &&
                    value.taskApproval === "Approved"
                  ) {
                    return (
                      <TableRow key={index}>
                        <TableCell>{value.title}</TableCell>

                        <TableCell align="center">
                          Date: {formatDate2(value.deadline)} | Time:{" "}
                          {formatTimeAMPM2(value.deadline)}
                        </TableCell>
                        <TableCell>
                          <VisibilityIcon
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
                          />
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
            marginBottom: "20px",
            bgcolor: "white",
            padding: "20px",
            boxShadow: "0 2px 4px red",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              textAlign: "center",
              bgcolor: "#FF0000",
              padding: "5px",
              borderRadius: "10px",
            }}
          >
            Pending Tasks
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Due
                </TableCell>

                <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks &&
                tasks.map((value, index) => {
                  if (value.taskStatus === "Pending") {
                    return (
                      <TableRow key={index}>
                        <TableCell>{value.title}</TableCell>

                        <TableCell align="center">
                          Date: {formatDate2(value.deadline)} | Time:{" "}
                          {formatTimeAMPM2(value.deadline)}
                        </TableCell>
                        <TableCell>
                          <VisibilityIcon
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
                          />
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
            padding: "20px",
            marginBottom: "30px",
            boxShadow: "0 2px 4px red",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              textAlign: "center",
              bgcolor: "#FF0000",
              padding: "5px",
              borderRadius: "10px",
            }}
          >
            Unapproved Tasks
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell
                  sx={{ fontSize: "15px", fontWeight: "bold" }}
                  align="center"
                >
                  Due
                </TableCell>

                <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks &&
                tasks.map((value, index) => {
                  if (
                    value.taskStatus === "Completed" &&
                    (value.taskApproval === "Pending" ||
                      value.taskApproval === "Disapproved")
                  ) {
                    return (
                      <TableRow key={index}>
                        <TableCell>{value.title}</TableCell>

                        <TableCell align="center">
                          Date: {formatDate2(value.deadline)} | Time:{" "}
                          {formatTimeAMPM2(value.deadline)}
                        </TableCell>
                        <TableCell>
                          {" "}
                          <VisibilityIcon
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
                          />
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

export default StudentDetails;
