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
const Heading = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
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
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));

const AvatarImage = styled("img")(({ theme }) => ({
  width: "5rem",
  height: "5rem",
  borderRadius: "50%",
  marginRight: "1rem",
  [theme.breakpoints.down("sm")]: {
    width: "3rem",
    height: "3rem",
  },
}));

const Container = styled(Box)({
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

const FormContainer = styled(Box)({
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
});

const SubmitButton = styled(Button)({
  width: "100%",

  marginTop: "1rem",
  backgroundColor: "#052f72", // Set a custom background color
  color: "white", // Set a custom text color
  borderRadius: "5px", // Add rounded corners
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", // Add a subtle box shadow
  transition: "background-color 0.3s ease", // Add a smooth transition effect
  "&:hover": {
    backgroundColor: "#0490db", // Change background color on hover
  },
});

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
    <Container>
      <Heading variant="h1">
        <AvatarImage
          src="https://upload.wikimedia.org/wikipedia/commons/c/c0/COMSATS_new_logo.jpg"
          alt="Avatar"
        />
        E-FYP Portal
      </Heading>
      <FormContainer>
        <form onSubmit={handleFSubmit}>
          {fEmailError && <p>{fEmailError}</p>}
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
              setFEmail(event.target.value);
              setFEmailError("");
            }}
          />
          <br />
          {fUserTypeError && <p>{fUserTypeError}</p>}
          {/* <Typography>Login Type:</Typography> */}
          <br />
          <FormControl
            fullWidth
            style={{ backgroundColor: "white", borderRadius: 10 }}
          >
            <InputLabel id="demo-simple-select-label">Domain</InputLabel>

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
          <SubmitButton variant="contained" type="submit">
            Submit
          </SubmitButton>
        </form>
      </FormContainer>
    </Container>
  );
}

export default ForgotPassword;
