import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  ButtonBase,
  FormControlLabel,
  FormGroup,
  Link,
  Typography,
  Modal,
  Checkbox,
  TextField,
} from "@mui/material";
import { fetchPref, updatePref } from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
function EditPreference(props) {
  const [fieldArray, setFieldArray] = useState([]);
  const [interestArray, setInterestArray] = useState([]);
  const [isDisabled, setIsDisabled] = useState();
  const [open, setOpen] = useState(false); // State for drawer open/close
  const { user } = useContext(ChatContext);
  useEffect(() => {
    const getPrefs = async () => {
      const data = await fetchPref(user.id);
      console.log(data);
      if (data.status === 200) {
        setInterestArray(data.data.areaOfInterest);
        setFieldArray(data.data.developmentField);
      }
    };
    getPrefs();
  }, []);
  //   console.log(user);

  useEffect(() => {
    console.log("running");
    console.log(interestArray.length);
    console.log(fieldArray.length);
    console.log(isDisabled);
    if (interestArray.length === 0) {
      setIsDisabled(true);
    }
    if (fieldArray.length === 0) {
      setIsDisabled(true);
    }
    if (interestArray.length > 0 && fieldArray.length > 0) {
      setIsDisabled(false);
    }
  }, [interestArray, fieldArray]);

  const handleCheckChange = (event) => {
    let { value, checked } = event.target;
    if (checked) {
      setInterestArray((prevInterestArray) => [...prevInterestArray, value]);
    } else {
      setInterestArray((prevInterestArray) =>
        prevInterestArray.filter((option) => option !== value)
      );
    }
  };
  const handleFieldChange = (event2) => {
    let { value, checked } = event2.target;
    if (checked) {
      setFieldArray((prevFieldArray) => [...prevFieldArray, value]);
    } else {
      setFieldArray((prevFieldArray) =>
        prevFieldArray.filter((option) => option !== value)
      );
    }
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleUpdate = async () => {
    if (isDisabled === false) {
      console.log(isDisabled);
      const data2 = await updatePref({
        id: user.id,
        developmentField: fieldArray,
        areaOfInterest: interestArray,
      });
      console.log(data2);
      if (data2.status === 200) {
        setInterestArray(data2.data.areaOfInterest);
        setFieldArray(data2.data.developmentField);
      }
    }
  };

  return (
    // <Box sx={{ display: "flex", height: "100vh" }}>
    //   <Box sx={{ width: "20%", backgroundColor: "#28282B" }}>
    //     <SupervisorNavbar onDrawerToggle={handleDrawerToggle} />
    //   </Box>
    <Box>
      <h4>Project Details</h4>

      <h5>Area of Interest </h5>
      <Box sx={{ marginTop: "2%" }}>
        {interestArray.length === 0 && (
          <Typography>Please check atleast 1 Area of Interest</Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "auto",
          height: "auto",
          padding: "1%",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              value="machine-learning"
              onChange={handleCheckChange}
              checked={interestArray.includes("machine-learning")}
            />
          }
          label="Machine Learning"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="augmented-reality"
              onChange={handleCheckChange}
              checked={interestArray.includes("augmented-reality")}
            />
          }
          label="Augmented Reality"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="e-commerce"
              onChange={handleCheckChange}
              checked={interestArray.includes("e-commerce")}
            />
          }
          label="E-Commerce"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="image-processing"
              onChange={handleCheckChange}
              checked={interestArray.includes("image-processing")}
            />
          }
          label="Image Processing"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "auto",
          height: "auto",
          padding: "1%",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              value="natural-language-processing"
              onChange={handleCheckChange}
              checked={interestArray.includes("natural-language-processing")}
            />
          }
          label="Natural Language Processing"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="web-3"
              onChange={handleCheckChange}
              checked={interestArray.includes("web-3")}
            />
          }
          label="Web 3.0"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="virtual-reality"
              onChange={handleCheckChange}
              checked={interestArray.includes("virtual-reality")}
            />
          }
          label="Virtual Reality"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="game-development"
              onChange={handleCheckChange}
              checked={interestArray.includes("game-development")}
            />
          }
          label="Game Development"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "auto",
          height: "auto",
          paddingBottom: "3%",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              value="other"
              onChange={handleCheckChange}
              checked={interestArray.includes("other")}
            />
          }
          label="Other"
        />
      </Box>
      <h5>Development Area</h5>
      <Box sx={{ marginTop: "2%" }}>
        {fieldArray.length === 0 && (
          <Typography>Please check atleast 1 Development Field</Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "auto",
          height: "auto",
          padding: "1%",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              value="mobile-application-development"
              onChange={handleFieldChange}
              checked={fieldArray.includes("mobile-application-development")}
            />
          }
          label="Mobile Application Development"
        />
        {/* {console.log(currentDA.includes("mobile-application-development"))} */}
        <FormControlLabel
          control={
            <Checkbox
              value="system-application-development"
              onChange={handleFieldChange}
              checked={fieldArray.includes("system-application-development")}
            />
          }
          label="System Application Development"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="web-development"
              onChange={handleFieldChange}
              checked={fieldArray.includes("web-development")}
            />
          }
          label="Web Development"
        />
      </Box>
      <Button disabled={isDisabled} onClick={handleUpdate}>
        Update
      </Button>
    </Box>
  );
}

export default EditPreference;
