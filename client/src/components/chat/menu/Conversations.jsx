// for supervisor chat
import React from "react";
import { useState, useEffect, useContext } from "react";
import { setChat } from "../../../api/api";
import { Box, styled, Divider } from "@mui/material";

import { getChatters } from "../../../api/api";

//components
import Conversation from "./Conversation";
import { ReceiverContext } from "../../../context/ReceiverProvider";

const Component = styled(Box)`
  overflow: overlay;
  height: 81vh;
`;

const StyledDivider = styled(Divider)`
  background-color: #e9edef;
  opacity: 0.6;
`;

const Conversations = ({ text }) => {
  const [groups, setGroups] = useState([]);
  const { receiver } = useContext(ReceiverContext);
  const [groupList, setGroupList] = useState([]);
  // const { account, socket, setActiveUsers } = useContext(AccountContext);

  useEffect(() => {
    const fetchChatters = async () => {
      let data = await getChatters({ _id: "641800d14c144769799107e6" });
      let filteredData = [];
      let groupList = [];
      data.user.map((chatter) => {
        groupList.push(chatter.name);
        if (chatter.name.toLowerCase().includes(text.toLowerCase()))
          filteredData.push({ id: chatter._id, name: chatter.name });
        chatter.studentID.map((student) => {
          if (student.name.toLowerCase().includes(text.toLowerCase()))
            filteredData.push({
              id: student._id,
              name: student.name,
            });
        });
        setGroupList(groupList);
      });

      setGroups(filteredData);
    };
    fetchChatters();
  }, [text]);

  useEffect(() => {
    const getChatterRefresh = async () => {
      if (receiver) {
        await setChat({
          sender: "641800d14c144769799107e6",
          receiver: receiver.id,
        });
      }
    };
    getChatterRefresh();
  }, [receiver]);

  // useEffect(() => {
  //     socket.current.emit('addUser', accounyt);
  //     socket.current.on("getUsers", users => {
  //         setActiveUsers(users);
  //     })
  // }, [account])

  // for supervisor chat

  return (
    <Component>
      {groups &&
        groups.map((chatter, index) => {
          return (
            <React.Fragment key={Object.values(chatter)[0]}>
              <Conversation
                key={chatter.id}
                chatter={chatter}
                groups={groupList}
              />

              <StyledDivider />
            </React.Fragment>
          );
        })}
    </Component>
  );
};

export default Conversations;
