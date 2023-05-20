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

const ForgotPasswordButton = styled(Button)({
  fontSize: "1rem",
  fontFamily: "Optima",
  color: "#0490db",
  transition: "background-color 0.3s ease",
  "&:hover": {
    color: "#D5004E",
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
    } else if (!/^.+@cuilahore\.edu\.pk$/.test(email)) {
      setMailError("Invalid email format");
    } else if (!password) {
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
        if (user2.data) await setUser(user2.data);
        // localStorage.setItem("user", JSON.stringify(user2.data));
        else {
          setError(user2);
        }
      }
    }
  };

  const forgotPassword = () => {
    navigate("/ForgotPassword");
  };
  useEffect(() => {
    if (user != null) {
      if (user.type === "Supervisor") navigate("/supervisor-dashboard");
      if (user.type === "Student") navigate("/student-dashboard");
      if (user.type === "FYPCommittee") navigate("/fyp-committee-dashboard");
    }
  }, [user, navigate]);

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
                width: 300,
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
                width: 300,
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
              width: 300,
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
          <ForgotPasswordButton
            variant="outlined"
            onClick={() => {
              navigate("/register-supervisor");
            }}
          >
            Register as supervisor
          </ForgotPasswordButton>
        </LoginForm>
      </LoginBox>
    </LoginContainer>
  );
}

export default Login;
