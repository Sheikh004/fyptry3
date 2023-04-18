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
  const [mailError, setMailError] = useState("");
  const [passError, setPassError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleChange = (SelectChangeEvent) => {
    setType(SelectChangeEvent.target.value);
    setTypeError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setMailError("Email is required");
    }
    //  else if (!/^.+@cuilahore\.edu\.pk$/.test(email)) {
    //   setMailError("Invalid email format");
    // }
    else if (!password) {
      setPassError("Password is required");
    } else if (password.length < 8) {
      setPassError("Password must be at least 8 characters long");
    } else if (!type) {
      setTypeError("Please select login type");
    } else {
      let data = {
        email: email,
        password: password,
        type: type,
      };
      let user2 = await getUser(data);

      if (user2 != null) {
        await setUser(user2.data);
      } else {
        setError(user2);
      }
    }
  };

  const forgotPassword = () => {
    navigate("/ForgotPassword");
  };
  useEffect(() => {
    if (user != null) {
      navigate("/SupervisorHome");
    }
  }, [user, navigate]);

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
        {mailError && <p>{mailError}</p>}
        <TextField
          id="filled-basic"
          label="Filled"
          variant="filled"
          onChange={(event) => {
            setEmail(event.target.value);
            setMailError("");
          }}
        />
        {passError && <p>{passError}</p>}
        <Typography>Password</Typography>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => {
            setPassword(event.target.value);
            setPassError("");
          }}
        />
        {typeError && <p>{typeError}</p>}
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
        {error && <p>{error}</p>}
        <Button type="submit">Submit</Button>
        <br />

        <Button variant="outlined" onClick={forgotPassword}>
          Forgot Password
        </Button>
      </form>
    </Box>
  );
}

export default Login;
