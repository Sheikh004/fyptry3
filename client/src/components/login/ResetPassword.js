import React, { useState } from "react";
import { TextField, Typography, Button, Avatar } from "@mui/material";
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
    } else {
      await setNewPassword({ newPass: newPass });
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url('https://i0.wp.com/jaamiah.com/wp-content/uploads/2018/12/CUI-LHR.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          src="https://upload.wikimedia.org/wikipedia/commons/c/c0/COMSATS_new_logo.jpg"
          alt="Avatar"
          style={{ width: "100px", height: "100px", marginRight: "10px" }}
        />
        <Typography
          variant="h4"
          style={{
            color: "black",
            fontSize: "2rem",
            fontWeight: "bold",
            fontFamily: "Lucida Bright",
          }}
        >
          E-FYP Portal
        </Typography>
      </div>

      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur",
          justifyContent: "center",
          alignItems: "center",
          padding: "100px",
          borderRadius: "5px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          maxWidth: "400px",
          border: "2px solid black",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <form onSubmit={handleNewPasswordSubmit}>
          {newPassError && <p>{newPassError}</p>}

          <TextField
            id="outlined-password-input"
            label="Password"
            InputLabelProps={{
              style: {
                color: "black",
              },
            }}
            InputProps={{
              style: {
                backgroundColor: "white",
                borderRadius: 10,
                width: 200,
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
                backgroundColor: "#052f72",
                color: "white",
                borderRadius: 10,
                marginTop: 10,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#0490db";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#052f72";
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
