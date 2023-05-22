import {
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { updateGroupMembers } from "../../api/api";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
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
      {console.log(modGroupLeader)}
      <SupervisorNavbar />
      <div style={{ backgroundColor: "#0b2b40", height: "100vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div style={{ backgroundColor: "#81007f", padding: "50px" }}>
            <FormControl component="fieldset">
              <RadioGroup
                onChange={handleGroupLeader}
                defaultValue={location.state.groupLeader}
              >
                <TextField
                  id="mgroup-name"
                  variant="filled"
                  label="Group Name"
                  value={modGName}
                  onChange={(e) => {
                    setModGName(e.target.value);
                  }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                ></TextField>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Action
                      </TableCell>
                      <TableCell
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Assign Group Leader
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {modMembers &&
                      Array.from({ length: modMembers.length }, (_, i) => {
                        return (
                          <TableRow key={"key" + i}>
                            <TableCell
                              key={"key" + i}
                              style={{ color: "white" }}
                            >
                              {modMembers[i].email}
                            </TableCell>
                            <TableCell>
                              <Button
                                key={"Button" + i}
                                style={{
                                  backgroundColor: "red",
                                  color: "white",
                                  borderRadius: 10,
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = "white";
                                  e.target.style.color = "red";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = "red";
                                  e.target.style.color = "white";
                                }}
                                onClick={() => {
                                  handleRemoveField(modMembers[i]._id);
                                }}
                              >
                                Delete
                              </Button>
                            </TableCell>
                            <TableCell>
                              <FormControlLabel
                                key={"rkey" + i}
                                value={modMembers[i].email}
                                control={<Radio />}
                                label="Assign Group Leader"
                                style={{ color: "white" }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}

                    {Array.from({ length: fieldNumber }, (_, i) => {
                      return (
                        <TableRow key={i.toString()}>
                          <TableCell>
                            <TextField
                              key={i}
                              id={i.toString()}
                              variant="filled"
                              label="Email Address of Student"
                              onChange={(e) => {
                                handleModInputFieldChange(i, e.target.value);
                              }}
                              InputProps={{
                                style: { color: "white" },
                              }}
                              InputLabelProps={{
                                style: { color: "white" },
                              }}
                            ></TextField>
                          </TableCell>
                          <TableCell>
                            <FormControlLabel
                              value={fieldList[i]}
                              control={<Radio />}
                              label="Assign Group Leader"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {totalNum < 3 && (
                  <Button
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: 10,
                      marginRight: "30px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "white";
                      e.target.style.color = "green";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "green";
                      e.target.style.color = "white";
                    }}
                    onClick={handleAddField}
                  >
                    Add member
                  </Button>
                )}
                {fieldNumber > 0 && totalNum > 0 && (
                  <Button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: 10,
                      marginRight: "30px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "white";
                      e.target.style.color = "red";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "red";
                      e.target.style.color = "white";
                    }}
                    onClick={() => {
                      handleRemoveField2();
                    }}
                  >
                    Delete
                  </Button>
                )}
              </RadioGroup>
              <Button
                onClick={handleGroupUpdate}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: 10,
                  marginRight: "30px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "black";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "black";
                  e.target.style.color = "white";
                }}
              >
                Update
              </Button>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditGroup;
