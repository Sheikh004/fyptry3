import { Box, Button, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { assignTask } from "../../api/api";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { useLocation } from "react-router-dom";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
function AssignTask(props) {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState();
  const { user } = useContext(ChatContext);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleDueDateChange = (value) => {
    setDueDate(value);
  };
  const assignNewTask = async () => {
    if (!title || !description || !dueDate) {
      alert("Please fill in all the fields"); // Display an alert message
      return;
    } else {
      let data = await assignTask({
        title: title,
        description: description,
        dueDate: dueDate,
        assignedBy: user.id,
        assignedTo: location.state._id,
      });

      alert("Task has been assigned");
    }
  };
  return (
    <Box sx={{ bgcolor: "#0490db", color: "white", minHeight: "100vh" }}>
      <SupervisorNavbar />

      <Box
        sx={{
          bgcolor: "#052f72",
          color: "white",
          padding: "20px",
          width: { xs: "100%", sm: "90%", md: "70%", lg: "70%" },
          margin: "20px auto",
          borderRadius: "15px", // Added borderRadius property
        }}
      >
        <Typography variant="h6">Enter Title of Task</Typography>
        <TextField
          multiline
          rows={1}
          onChange={handleTitleChange}
          sx={{
            width: "100%",
            marginBottom: "10px",
            bgcolor: "white",
            borderRadius: "15px",
          }} // Added borderRadius property
        />

        <Typography variant="h6">Enter Task Description</Typography>
        <TextField
          multiline
          rows={13}
          onChange={handleDescriptionChange}
          sx={{
            width: "100%",
            marginBottom: "10px",
            bgcolor: "white",
            borderRadius: "15px",
          }} // Added borderRadius property
        />

        <Typography variant="h6">Enter Due Date of Task</Typography>
        <DateTimePicker
          onChange={handleDueDateChange}
          sx={{
            width: "100%",
            marginBottom: "10px",
            bgcolor: "white",
            borderRadius: "15px",
          }} // Added borderRadius property
        />
        <Button
          style={{
            backgroundColor: "#0490db",
            color: "white",
            border: "1px solid #0490db",
            borderRadius: "4px",
            padding: "8px 16px",
            textTransform: "uppercase",
            transition: "background-color 0.3s ease",

            "&:hover": {
              backgroundColor: "#0477af",
            },
          }}
          onClick={assignNewTask}
          sx={{ marginBottom: "10px", borderRadius: "15px" }}
        >
          Assign
        </Button>
      </Box>
    </Box>
  );
}

export default AssignTask;
