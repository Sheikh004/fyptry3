import React, { useState, useEffect } from "react";
import { getUser, getChatters } from "../../api/api";
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
    await getUser(data);
  };

  const fetchChatters = async (e) => {
    e.preventDefault();
    const data2 = await getChatters({ _id: "641800d14c144769799107e6" });
    // let filteredChatters = [];

    console.log(data2.data);
    // data.map((user) => {
    //   filteredChatters.append(user);
    // });
    // console.log(filteredChatters);
    //   setUsers(fiteredData);
  };

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
      <form onSubmit={fetchChatters}>
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
