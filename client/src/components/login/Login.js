import React, { useState, useEffect, useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { getUser, getChatters } from "../../api/api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  styled,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Typography,
  Button,
} from "@mui/material";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const { user, setUser } = useContext(ChatContext);
  const navigate = useNavigate();
  const handleChange = (SelectChangeEvent) => {
    setType(SelectChangeEvent.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
      type: type,
    };
    let user2 = await getUser(data);

    if (user2 != null) {
      await setUser(user2);
    }
  };
  useEffect(() => {
    if (user != null) navigate("/SupervisorHome");
  }, [user]);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        flex: 1,
        alignItems: "center",
        justContent: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          id="filled-basic"
          label="Filled"
          variant="filled"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Typography>Password</Typography>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Typography>Login Type:</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Login Type</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            value={type}
            label="LoginType"
            onChange={handleChange}
          >
            <MenuItem value={"Student"}>Student</MenuItem>
            <MenuItem value={"Supervisor"}>Supervisor</MenuItem>
            <MenuItem value={"Evaluator"}>Evaluator</MenuItem>
            <MenuItem value={"Reviewer"}>Reviewer</MenuItem>
            <MenuItem value={"FYPCommittee"}>FYP Committee</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}

export default Login;
