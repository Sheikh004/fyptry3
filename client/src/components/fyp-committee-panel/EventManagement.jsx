import {
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { getEvents, createEvent } from "../../api/api";
import React, { useEffect, useState } from "react";

function EventManagement(props) {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [bool, setBool] = useState(false);
  const [check, setCheck] = useState(false);

  const handleChange = (value) => {
    setSelectedEvent(value);
  };

  useEffect(() => {
    const handleEvent = async () => {
      if (selectedEvent && startDate && endDate && check === true) {
        console.log(check);
        console.log(selectedEvent);
        console.log(startDate);
        console.log(endDate);
        const data2 = await createEvent({
          eName: selectedEvent,
          sDate: startDate,
          eDate: endDate,
        });
        console.log(data2);

        setBool(false);
      }
      setCheck(false);
    };
    handleEvent();
  }, [selectedEvent, startDate, endDate, check]);

  const handleStartDateChange = (value) => {
    setStartDate(value);
  };
  const handleEndDateChange = (value) => {
    setEndDate(value);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      console.log(data);
    };
    fetchEvents();
  }, [bool]);
  return (
    <Box>
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
          Event Type
        </InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue=""
          value={selectedEvent}
          label="Event Type"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        >
          <MenuItem value={"FYP-Proposal-Submission"}>
            FYP Proposal Submission
          </MenuItem>
          <MenuItem value={"FYP-I"}>FYP-I</MenuItem>
          <MenuItem value={"Pre-FYP"}>Pre-FYP</MenuItem>
          <MenuItem value={"FYP-II-Report-and-Poster-Submission"}>
            FYP-II Report and Poster Submission
          </MenuItem>
          <MenuItem value={"FYP-II"}>FYP-II</MenuItem>
        </Select>
      </FormControl>
      <Typography>Start Date</Typography>
      <DateTimePicker onChange={handleStartDateChange} />
      <Typography>End Date</Typography>
      <DateTimePicker onChange={handleEndDateChange} />
      <Button
        onClick={() => {
          setCheck(true);
        }}
      >
        Set Event
      </Button>
    </Box>
  );
}

export default EventManagement;
