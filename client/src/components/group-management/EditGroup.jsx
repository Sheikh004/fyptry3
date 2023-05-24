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
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
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
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "20%", backgroundColor: "#28282B" }}>
        <SupervisorNavbar />
      </div>
      <div
        style={{
          width: "80%",
          backgroundColor: "lightgrey",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: "20px",
            backgroundColor: "white",
          }}
        >
          <div style={{ backgroundColor: "white", width: "100vw" }}>
            <FormControl component="fieldset" style={{ width: "78vw" }}>
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
                    style: { color: "black" },
                  }}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                ></TextField>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Action
                      </TableCell>
                      <TableCell
                        style={{
                          color: "black",
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
                              style={{ color: "black" }}
                            >
                              {modMembers[i].email}
                            </TableCell>
                            <TableCell>
                              <IconButton
                                key={"Button" + i}
                                style={{
                                  color: "red",
                                  backgroundColor: "transparent",
                                }}
                                onClick={() => {
                                  handleRemoveField(modMembers[i]._id);
                                }}
                                title="Delete"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <FormControlLabel
                                key={"rkey" + i}
                                value={modMembers[i].email}
                                control={<Radio />}
                                label="Assign Group Leader"
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
                                style: {
                                  color: "black",
                                  backgroundColor: "transparent",
                                },
                              }}
                              InputLabelProps={{
                                style: {
                                  color: "black",
                                  backgroundColor: "transparent",
                                },
                              }}
                            ></TextField>
                          </TableCell>
                          <TableCell>
                            {" "}
                            {fieldNumber > 0 && totalNum > 0 && (
                              <IconButton
                                style={{
                                  color: "red",
                                  backgroundColor: "transparent",
                                }}
                                onClick={() => {
                                  handleRemoveField2();
                                }}
                                title="Delete"
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
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
                <div style={{ display: "flex" }}>
                  {totalNum < 3 && (
                    <IconButton
                      style={{
                        backgroundColor: "transparent",
                        color: "inherit",
                        border: "none",
                        marginRight: "30px",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "green";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "inherit";
                      }}
                      onClick={handleAddField}
                      title="Add Member"
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </div>
              </RadioGroup>
              <IconButton
                onClick={handleGroupUpdate}
                style={{
                  backgroundColor: "transparent",
                  color: "inherit",
                  border: "none",
                }}
                title="Update"
              >
                <UpdateIcon />
              </IconButton>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditGroup;
