import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatters, deleteGroup } from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
import Group from "./Group";
import {
  Box,
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
function ViewGroups(props) {
  const { user } = useContext(ChatContext);
  const [registerBool, setRegisterBool] = useState();
  const [groups, setGroups] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();

  const navigateToEditPage = (group) => {
    navigate("/edit-group", { state: group });
  };

  const navigateRegisterGroup = () => {
    navigate("/register-group");
  };

  const deletingGroup = async (groupId) => {
    const data = await deleteGroup(groupId);

    setDeleteMessage(data);
    setIsDelete(!isDelete);
  };
  useEffect(() => {
    if (deleteMessage) console.log(deleteMessage);
  }, [isDelete, deleteMessage]);
  useEffect(() => {
    const getGroups = async () => {
      // let user = JSON.parse(localStorage.getItem("user"));
      // console.log(user);
      if (user != null) {
        const data = await getChatters({ supId: user.id });
        if (data.user.length < 3) setRegisterBool(true);
        else setRegisterBool(false);

        let groupList = [];
        data.user.map((member) => {
          groupList.push(member);

          setGroups(groupList);
        });
      }
    };
    getGroups();
  }, [isDelete]);
  return (
    <Box style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "20%", backgroundColor: "#28282B" }}>
        <SupervisorNavbar />
      </div>
      <Box
        style={{
          width: "80%",
          backgroundColor: "lightgrey",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            {/* Navbar */}
            {/* Place your navbar component here */}
          </Grid>
          <Grid item xs={12}>
            {/* Main content */}
            <Box
              sx={{
                height: "90vh",
                bgcolor: "lightgrey",
                maxWidth: "100%",
                overflow: "auto",
                padding: "1rem",
              }}
            >
              <TableContainer component={Paper}>
                <Table>
                  <TableHead style={{ backgroundColor: "#28282B" }}>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold", color: "white" }}>
                        Group Name
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold", color: "white" }}>
                        Action
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold", color: "white" }}>
                        Members
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groups &&
                      groups.map((group, key) => {
                        return (
                          <TableRow key={"TableRow" + key}>
                            <TableCell key={"TableCell1" + key}>
                              {group.name}
                            </TableCell>
                            <TableCell key={"TableCell2" + key}>
                              <Button
                                key={"delete" + key}
                                onClick={() => {
                                  deletingGroup(group._id);
                                }}
                              >
                                <DeleteIcon style={{ color: "black" }} />
                              </Button>
                              <Button
                                key={"edit" + key}
                                onClick={() => {
                                  navigateToEditPage(group);
                                }}
                              >
                                <EditIcon style={{ color: "black" }} />
                              </Button>
                            </TableCell>

                            <TableCell key={"TableCell3" + key}>
                              <Group group={group} key={key} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {registerBool && (
                <Button
                  variant="outlined"
                  sx={{
                    bgcolor: "white",
                    color: "#28282B",
                    border: "1px solid #28282B",
                    borderRadius: "4px",
                    padding: "8px 16px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      bgcolor: "#28282B",
                      color: "white",
                    },
                  }}
                  onClick={navigateRegisterGroup}
                >
                  Register Group
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ViewGroups;
