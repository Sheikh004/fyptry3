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

// Create a styled component for the login container
const LoginContainer = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#0b2b40",
});

// Create a styled component for the login box
const LoginBox = styled(Box)({
  width: "70%",
  display: "flex",
  flexDirection: "row",
  border: "2px solid black",
  borderRadius: "10px",
  overflow: "hidden",
});

// Create a styled component for the login form
const LoginForm = styled("form")({
  width: "70%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#81007f",
  padding: "2rem",
});

// Create a styled component for the error messages
const ErrorMessage = styled("p")({
  color: "red",
});

// Create a styled component for the submit button
const SubmitButton = styled(Button)({
  width: "20%",
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

// Create a styled component for the image container
const ImageContainer = styled(Box)({
  width: "30%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

// Create a styled component for the image
const Image = styled("img")({
  width: "100%",
  height: "80%",
});

const ForgotPasswordButton = styled(Button)({
  fontSize: "0.8rem",
  color: "white",
  transition: "background-color 0.3s ease", // Add a smooth transition effect
  "&:hover": {
    color: "#D5004E", // Change background color on hover
  },
});

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
        // localStorage.setItem("user", JSON.stringify(user2.data));
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
      if (user.type === "Supervisor") navigate("/view-groups");
      if (user.type === "Student") navigate("/student-tasks-view");
    }
  }, [user, navigate]);

  return (
    <LoginContainer>
      <LoginBox>
        <LoginForm onSubmit={handleSubmit}>
          {mailError && <ErrorMessage>{mailError}</ErrorMessage>}
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            onChange={(event) => {
              setEmail(event.target.value);
              setMailError("");
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
              },
            }}
          />
          {passError && <ErrorMessage>{passError}</ErrorMessage>}
          {/* <Typography>Password</Typography> */}
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            variant="filled"
            autoComplete="current-password"
            onChange={(event) => {
              setPassword(event.target.value);
              setPassError("");
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
              },
            }}
          />
          {typeError && <ErrorMessage>{typeError}</ErrorMessage>}
          {/* <Typography>Login Type:</Typography> */}
          <FormControl
            style={{
              margin: "10px 0",
              width: "40%",
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <InputLabel id="demo-simple-select-label" variant="filled">
              Login Type
            </InputLabel>

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
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton type="submit">Submit</SubmitButton>
          <br />

          <ForgotPasswordButton variant="outlined" onClick={forgotPassword}>
            Forgot Password
          </ForgotPasswordButton>
        </LoginForm>
        <ImageContainer>
          <Image
            src="https://play-lh.googleusercontent.com/dR5oRHZkctNt4p7YqMsPDDSTNRUoZ-V92rOoBTSpoB8o2AtuLVpPuwEOfMhpQwKX6wg"
            alt="Image"
          />
        </ImageContainer>
      </LoginBox>
    </LoginContainer>
  );
}

export default Login;
