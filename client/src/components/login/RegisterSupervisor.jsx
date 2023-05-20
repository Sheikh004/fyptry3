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
  const [sEmailError, setSEmailError] = useState("");
  const handleRegisterSupervisor = async (e) => {
    e.preventDefault();
    setSEmailError("");
    if (!sEmail) {
      setSEmailError("Email is required");
    } else if (!/^.+@cuilahore\.edu\.pk$/.test(sEmail)) {
      setSEmailError("Invalid email format");
    } else {
      let data = sEmail;
      let isSupervisor = await registerSupervisor(data);
      if (isSupervisor) {
        console.log(isSupervisor);
      } else {
        console.log(isSupervisor);
      }
    }
  };
  return (
    <Container>
      <FormContainer>
        <form onSubmit={handleRegisterSupervisor}>
          {sEmailError && <p>{sEmailError}</p>}
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

          <SubmitButton variant="contained" type="submit">
            Submit
          </SubmitButton>
        </form>
      </FormContainer>
    </Container>
  );
}

export default RegisterSupervisor;
