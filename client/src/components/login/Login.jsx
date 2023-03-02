import React, { useState } from "react";
import {
  Box,
  styled,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const handleChange = (SelectChangeEvent) => {
    setType(SelectChangeEvent.target.value);
  };

  // console.log(type);
  // console.log(email);
  // console.log(password);
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
      <Typography>Email Address</Typography>
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        onChange={setEmail}
      />
      <Typography>Password</Typography>
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={setPassword}
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
        </Select>
      </FormControl>
    </Box>
  );
}

export default Login;
