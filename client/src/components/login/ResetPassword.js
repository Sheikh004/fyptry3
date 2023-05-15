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
    <div
      style={{
        backgroundColor: "#0b2b40",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ backgroundColor: "#81007f", padding: "50px" }}>
        <form onSubmit={handleNewPasswordSubmit}>
          <Typography variant="h5" gutterBottom style={{ color: "white" }}>
            Reset your password
          </Typography>
          <br />
          {newPassError && <p>{newPassError}</p>}

          <TextField
            id="outlined-password-input"
            label="Password"
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            type="password"
            autoComplete="current-password"
            onChange={(event) => {
              setNewPass(event.target.value);
              setNewPassError("");
            }}
          />
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: 10,
                margintop: 10,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "black";
                e.target.style.color = "white";
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
