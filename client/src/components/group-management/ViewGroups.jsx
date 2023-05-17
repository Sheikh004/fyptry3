import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatters, deleteGroup } from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
import Group from "./Group";
import { Box, Button, Typography } from "@mui/material";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
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
    <Box>
      <SupervisorNavbar />
      <Box
        color={"white"}
        sx={{
          width: "100vw",
          bgcolor: "#0B2B40",
          minHeight: "100vh",
          paddingTop: "20vh",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "45vh",
            bgcolor: "purple",
            margin: "0 auto",
            maxWidth: "50%",
            overflow: "auto",
            padding: "1rem",
          }}
        >
          {groups &&
            groups.map((group, key) => {
              return (
                <Box key={"Box" + key}>
                  <Typography key={"TYpography" + key}>{group.name}</Typography>

                  <Button
                    key={"delete" + key}
                    onClick={() => {
                      deletingGroup(group._id);
                    }}
                  >
                    Delete Group
                  </Button>
                  <Button
                    key={"edit" + key}
                    onClick={() => {
                      navigateToEditPage(group);
                    }}
                  >
                    Edit Group
                  </Button>
                  <Group group={group} key={key} />
                </Box>
              );
            })}
          {registerBool && (
            <Button
              variant="outlined"
              sx={{
                bgcolor: "white",
                color: "purple",
                border: "1px solid purple",
                borderRadius: "4px",
                padding: "8px 16px",
                fontWeight: "bold",
                textTransform: "uppercase",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  bgcolor: "purple",
                  color: "white",
                },
              }}
              onClick={navigateRegisterGroup}
            >
              Register Group
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ViewGroups;
