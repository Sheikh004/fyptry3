import React, { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import { setNewPassword } from "../../api/api";
function ResetPassword(props) {
  const [newPass, setNewPass] = useState("");
  const [newPassError, setNewPassError] = useState("");
  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!newPass) {
      setNewPassError("Password is required");
    } else if (newPass.length < 8) {
      setNewPassError("Password must be at least 8 characters long");
    } else await setNewPassword({ newPass: newPass });
  };

  return (
    <div>
      <form onSubmit={handleNewPasswordSubmit}>
        <Typography>Reset your password</Typography>
        {newPassError && <p>{newPassError}</p>}

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => {
            setNewPass(event.target.value);
            setNewPassError("");
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default ResetPassword;
