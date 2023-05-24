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

const Heading = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "2rem",
  left: "50%",
  transform: "translateX(-50%)",
  color: "black",
  fontSize: "2rem",
  fontWeight: "bold",
  fontFamily: "Lucida Bright",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
    top: "1rem",
    fontWeight: "normal",
  },
}));

const AvatarImage = styled("img")({
  width: "5rem",
  height: "5rem",
  borderRadius: "50%",
  marginRight: "1rem",
});

const LoginContainer = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage:
    "url('https://i0.wp.com/jaamiah.com/wp-content/uploads/2018/12/CUI-LHR.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
});

const LoginBox = styled(Box)({
  width: "90%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
});

const LoginForm = styled("form")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur",
  padding: "2rem",
});

const ErrorMessage = styled("p")({
  color: "red",
});

const SubmitButton = styled(Button)({
  width: "100%",
  marginTop: "1rem",
  backgroundColor: "#052f72",
  color: "white",
  borderRadius: "5px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#38CBFC",
  },
});

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#0b2b40",
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
    <LoginContainer>
      <Heading variant="h1">
        <AvatarImage
          src="https://upload.wikimedia.org/wikipedia/commons/c/c0/COMSATS_new_logo.jpg"
          alt="Avatar"
        />
        E-FYP Portal
      </Heading>
      <LoginBox>
        <LoginForm onSubmit={handleRegisterSupervisor}>
          {sEmailError && <ErrorMessage>{sEmailError}</ErrorMessage>}
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            onChange={(event) => {
              setSEmail(event.target.value);
              setSEmailError("");
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
                marginTop: 10,
                borderRadius: 10,
                width: 300,
              },
            }}
          />
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
                marginTop: 10,
                borderRadius: 10,
                width: 300,
              },
            }}
          />

          {sError && <p>{sError}</p>}
          <SubmitButton type="submit">Submit</SubmitButton>
          <br />
        </LoginForm>
      </LoginBox>
    </LoginContainer>
  );
}

export default RegisterSupervisor;
