import {
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { updateGroupMembers } from "../../api/api";
function EditGroup(props) {
  const location = useLocation();
  const [modGName, setModGName] = useState(location.state.name);
  const [modMembers, setModMembers] = useState(location.state.studentID);
  const [modGroupLeader, setModGroupLeader] = useState();
  const [fieldList, setFieldList] = useState([]);
  const [totalNum, setTotalNum] = useState();
  const [fieldNumber, setFieldNumber] = useState(0);
  const [actualList, setActualList] = useState();
  useEffect(() => {
    setTotalNum(modMembers.length + fieldNumber);
  }, [fieldNumber, modMembers]);
  const handleGroupLeader = (e) => {
    setModGroupLeader(e.target.value);
  };
  const handleAddField = () => {
    setFieldNumber(fieldNumber + 1);
  };
  const handleRemoveField = (remValue) => {
    const modded = modMembers.filter((value) => {
      if (value._id !== remValue) {
        return value;
      }
      setTotalNum(totalNum - 1);
    });
    setModMembers(modded);
  };

  const handleRemoveField2 = () => {
    setFieldNumber(fieldNumber - 1);
  };
  const handleModInputFieldChange = (i, value) => {
    let arr = [...fieldList];
    arr[i] = value;
    setFieldList(arr);
  };

  const handleGroupUpdate = async () => {
    let arr2 = modMembers.map((email) => {
      return email.email;
    });
    fieldList.map((email) => {
      arr2.push(email);
    });
    setActualList(arr2);
  };
  useEffect(() => {
    const update = async () => {
      if (actualList) {
        const data = await updateGroupMembers({
          groupName: modGName,
          studentID: actualList,
          groupLeader: modGroupLeader,
          groupID: location.state._id,
        });
        console.log(data);
      }
    };
    update();
  }, [actualList]);
  return (
    <div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="gender1"
          onChange={handleGroupLeader}
        >
          {console.log(location.state)}
          <p>Group Name</p>
          <TextField
            id="mgroup-name"
            variant="filled"
            value={modGName}
            onChange={(e) => {
              setModGName(e.target.value);
            }}
          ></TextField>

          {modMembers &&
            Array.from({ length: modMembers.length }, (_, i) => {
              return (
                <div key={"key" + i}>
                  <p key={"key" + i}>{modMembers[i].email}</p>
                  <Button
                    key={"Button" + i}
                    onClick={() => {
                      handleRemoveField(modMembers[i]._id);
                    }}
                  >
                    Delete
                  </Button>
                  <FormControlLabel
                    key={"rkey" + i}
                    value={modMembers[i].email}
                    control={<Radio />}
                    label="Assign Group Leader"
                  />
                </div>
              );
            })}

          {Array.from({ length: fieldNumber }, (_, i) => {
            return (
              <div key={i.toString()}>
                <p>Enter Email Address of Student</p>
                <TextField
                  key={i}
                  id={i.toString()}
                  label="Filled"
                  variant="filled"
                  onChange={(e) => {
                    handleModInputFieldChange(i, e.target.value);
                  }}
                ></TextField>
                <FormControlLabel
                  value={fieldList[i]}
                  control={<Radio />}
                  label="Assign Group Leader"
                />
              </div>
            );
          })}
          {modMembers && totalNum && totalNum < 3 && (
            <Button onClick={handleAddField}>Add member</Button>
          )}
          {fieldNumber > 1 && totalNum > 0 && (
            <Button
              onClick={() => {
                handleRemoveField2();
              }}
            >
              Delete
            </Button>
          )}
        </RadioGroup>
        <Button onClick={handleGroupUpdate}>Update</Button>
      </FormControl>
    </div>
  );
}

export default EditGroup;
