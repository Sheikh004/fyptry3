import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatters } from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
import Group from "./Group";
import { Box, Button } from "@mui/material";
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
      {groups &&
        groups.map((group, key) => {
          return <Group group={group} key={key} />;
        })}
      {registerBool && (
        <Button variant="outlined" onClick={navigateRegisterGroup}>
          Register Group
        </Button>
      )}
    </Box>
  );
}

export default ViewGroups;
