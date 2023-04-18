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
  Button,
} from "@mui/material";
import { forgotPasswordEmail } from "../../api/api";
function ForgotPassword(props) {
  const [fEmail, setFEmail] = useState("");
  const [fEmailError, setFEmailError] = useState("");
  const [fUserTypeError, setFUserTypeError] = useState("");
  const [fUserType, setFUserType] = useState("");
  const handleFSubmit = (e) => {
    e.preventDefault();

    if (!fEmail) {
      setFEmailError("Email is required");
    }
    // else if (!/^.+@cuilahore\.edu\.pk$/.test(fEmail)) {
    //   setFEmailError("Invalid email format");
    // }
    else if (!fUserType) {
      setFUserTypeError("Please select login type");
    } else {
      let data = {
        fEmail: fEmail,
        fUserType: fUserType,
      };
      forgotPasswordEmail(data);
    }
  };
  const handleFChange = (SelectChangeEvent) => {
    setFUserType(SelectChangeEvent.target.value);
    setFUserTypeError("");
  };
  return (
    <div>
      <form onSubmit={handleFSubmit}>
        {fEmailError && <p>{fEmailError}</p>}
        <TextField
          id="filled-basic"
          label="Filled"
          variant="filled"
          onChange={(event) => {
            setFEmail(event.target.value);
            setFEmailError("");
          }}
        />
        <br />
        {fUserTypeError && <p>{fUserTypeError}</p>}
        <Typography>Login Type:</Typography>
        <br />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Login Type</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            value={fUserType}
            label="LoginType"
            onChange={handleFChange}
          >
            <MenuItem value={"Student"}>Student</MenuItem>
            <MenuItem value={"Supervisor"}>Supervisor</MenuItem>
            <MenuItem value={"Evaluator"}>Evaluator</MenuItem>
            <MenuItem value={"Reviewer"}>Reviewer</MenuItem>
            <MenuItem value={"FYPCommittee"}>FYP Committee</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
