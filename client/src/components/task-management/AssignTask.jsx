import { Box, Button, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { assignTask } from "../../api/api";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { useLocation } from "react-router-dom";
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
    let data = await assignTask({
      title: title,
      description: description,
      dueDate: dueDate,
      assignedBy: user.id,
      assignedTo: location.state._id,
    });
    console.log(data);
  };
  return (
    <Box>
      <Typography>Enter Title of Task</Typography>
      <TextField
        multiline
        rows={1}
        onChange={handleTitleChange}
        style={{ width: "50vw" }}
      />

      <Typography>Enter Task Description</Typography>
      <TextField
        multiline
        rows={13}
        style={{ width: "50vw", height: "45vh" }}
        onChange={handleDescriptionChange}
      />

      <Typography>Enter Due Date of Task</Typography>
      <DateTimePicker onChange={handleDueDateChange} />
      <Button onClick={assignNewTask}>Assign</Button>
    </Box>
  );
}

export default AssignTask;
