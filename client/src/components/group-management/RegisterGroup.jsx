import React, { useState, useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getGroupMembers } from "../../api/api";
function RegisterGroup(props) {
  const [memberNumber, setMemberNumber] = useState(1);
  const [members, setMembers] = useState(Array(memberNumber).fill(""));
  const [groupName, setGroupName] = useState("");
  const { user } = useContext(ChatContext);
  const handleInputFieldChange = (index, value) => {
    let updatedEntries = [...members];
    updatedEntries[index] = value;
    setMembers(updatedEntries);
    console.log(members);
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
    if (groupName !== "" && members.length !== 0 && user !== null) {
      const registerData = await getGroupMembers({
        groupMembers: members,
        groupName: groupName.toUpperCase(),
        supId: user.id,
      });
      console.log(registerData);
    }
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
          }}
        ></TextField>
      </Box>
      <Box>
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
            </Box>
          );
        })}
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
