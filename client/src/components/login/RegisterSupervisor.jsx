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
import { registerSupervisor } from "../../api/api";

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#0b2b40",
});
const ErrorMessage = styled("p")({
  color: "red",
});
const FormContainer = styled(Box)({
  backgroundColor: "#81007f",
  justifyContent: "center",
  alignItems: "center",
  padding: "100px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  maxWidth: "400px",
  border: "2px solid black",
  borderRadius: "10px",
  overflow: "hidden",
});

const SubmitButton = styled(Button)({
  width: "100%",

  marginTop: "1rem",
  backgroundColor: "#0b2b40", // Set a custom background color
  color: "white", // Set a custom text color
  borderRadius: "5px", // Add rounded corners
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", // Add a subtle box shadow
  transition: "background-color 0.3s ease", // Add a smooth transition effect
  "&:hover": {
    backgroundColor: "#D5004E", // Change background color on hover
  },
});

function RegisterSupervisor(props) {
  const [sEmail, setSEmail] = useState("");
  const [sPassword, setSPassword] = useState("");
  const [sEmailError, setSEmailError] = useState("");
  const [sPassError, setSPassError] = useState("");
  const [sError, setSError] = useState("");
  const handleRegisterSupervisor = async (e) => {
    e.preventDefault();
    setSError("");
    setSEmailError("");
    if (!sEmail) {
      setSEmailError("Email is required");
    } else if (!/^.+@cuilahore\.edu\.pk$/.test(sEmail)) {
      setSEmailError("Invalid email format");
    } else if (!sPassword) {
      setSPassError("Password is required");
    } else if (sPassword.length < 8) {
      setSPassError("Password must be at least 8 characters long");
    } else {
      let isSupervisor = await registerSupervisor({
        email: sEmail,
        password: sPassword,
      });
      if (isSupervisor.status === 200) {
        console.log(isSupervisor.data.message);
      } else {
        console.log(isSupervisor.response.data.message);
        setSError(isSupervisor.response.data.message);
      }
    }
  };
  return (
    <Container>
      <FormContainer>
        <form onSubmit={handleRegisterSupervisor}>
          {sEmailError && <ErrorMessage>{sEmailError}</ErrorMessage>}
          <TextField
            id="filled-basic"
            label="Email Address"
            variant="filled"
            fullWidth
            InputProps={{
              classes: {
                root: "rounded-input",
              },
              style: {
                backgroundColor: "white",

                borderRadius: 10,
              },
            }}
            onChange={(event) => {
              setSEmail(event.target.value);
              setSEmailError("");
            }}
          />
          <br />
          {sPassError && <ErrorMessage>{sPassError}</ErrorMessage>}
          {/* <Typography>Password</Typography> */}
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            variant="filled"
            autoComplete="current-password"
            onChange={(event) => {
              setSPassword(event.target.value);
              setSPassError("");
            }}
            InputLabelProps={{
              style: {
                textAlign: "center",
                marginTop: 10,
              },
            }}
            InputProps={{
              classes: {
                root: "rounded-input",
              },
              style: {
                backgroundColor: "white",

                borderRadius: 10,
              },
            }}
          />
          <br />
          {sError && <p>{sError}</p>}
          {/* {console.log(sError.message)} */}
          <SubmitButton variant="contained" type="submit">
            Submit
          </SubmitButton>
        </form>
      </FormContainer>
    </Container>
  );
}

export default RegisterSupervisor;
