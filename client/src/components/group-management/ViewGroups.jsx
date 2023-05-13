import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatters } from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
import Group from "./Group";
import { Box, Button } from "@mui/material";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
function ViewGroups(props) {
  const { user } = useContext(ChatContext);
  const [registerBool, setRegisterBool] = useState();
  const [groups, setGroups] = useState([]);
  const [navigation, setNavigation] = useState(false);
  const navigate = useNavigate();
  const settingState = () => {
    setNavigation(true);
  };

  const navigateRegisterGroup = () => {
    navigate("/register-group");
  };

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
  }, []);
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
              return <Group group={group} key={key} />;
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
