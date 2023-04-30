import React, { useState, useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import {
  Box,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";

import { getGroupMembers } from "../../api/api";
function RegisterGroup(props) {
  const [memberNumber, setMemberNumber] = useState(1);
  const [members, setMembers] = useState(Array(memberNumber).fill(""));
  const [groupName, setGroupName] = useState("");
  const [duplicateError, setDuplicateError] = useState();
  const { user } = useContext(ChatContext);
  const [groupLeader, setGroupLeader] = useState("");
  const handleInputFieldChange = (index, value) => {
    let updatedEntries = [...members];
    updatedEntries[index] = value.toLowerCase();
    setMembers(updatedEntries);
  };
  const addNewField = () => {
    setMemberNumber(memberNumber + 1);
    setMembers([...members, ""]);
  };
  const handleGroupFieldChange = (value) => {
    setGroupName(value);
  };
  const removeField = () => {
    setMemberNumber(memberNumber - 1);
    let updatedRemoveList = [...members];
    console.log(updatedRemoveList);
    updatedRemoveList.pop();
    console.log(updatedRemoveList);
    setMembers(updatedRemoveList);
  };

  const register = async () => {
    let uniqueEmails = new Set(
      members.map((email) => {
        return email;
      })
    );

    if (uniqueEmails.size < members.length) {
      setDuplicateError(true);
      console.log(duplicateError);
    } else {
      setDuplicateError(false);

      if (groupName !== "" && members.length !== 0 && user !== null) {
        const registerData = await getGroupMembers({
          groupMembers: members,
          groupName: groupName.toUpperCase(),
          supId: user.id,
          groupLeader: groupLeader,
        });
        console.log(registerData);
      }
    }
  };

  const handleGroupLeader = (e) => {
    setGroupLeader(e.target.value);
    console.log(groupLeader);
  };
  return (
    <Box>
      <Box>
        <Typography>Enter Group Name</Typography>
        <TextField
          id="group-name"
          label="Filled"
          variant="filled"
          onChange={(e) => {
            handleGroupFieldChange(e.target.value);
            console.log(groupLeader);
          }}
        ></TextField>
      </Box>

      <Box>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            onChange={handleGroupLeader}
          >
            {Array.from({ length: memberNumber }, (_, i) => {
              return (
                <Box key={i.toString()}>
                  <Typography>Enter Email Address of Student</Typography>
                  <TextField
                    key={i}
                    id={i.toString()}
                    label="Filled"
                    variant="filled"
                    onChange={(e) => {
                      handleInputFieldChange(i, e.target.value);
                    }}
                  ></TextField>
                  <FormControlLabel
                    value={members[i]}
                    control={<Radio />}
                    label="Assign Group Leader"
                  />
                </Box>
              );
            })}
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <br />
        {memberNumber < 3 && (
          <Button variant="outlined" onClick={addNewField}>
            Add member
          </Button>
        )}
        {memberNumber > 1 && (
          <Button variant="outlined" onClick={removeField}>
            Remove member
          </Button>
        )}

        <Button variant="outlined" onClick={register}>
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterGroup;