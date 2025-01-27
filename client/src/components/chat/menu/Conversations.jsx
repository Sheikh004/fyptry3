// for supervisor chat
import React from "react";
import { useState, useEffect, useContext } from "react";
import { setChat, setGroupChat } from "../../../api/api";
import { Box, styled, Divider, Typography } from "@mui/material";

import { getChatters, getStChatters } from "../../../api/api";

//components
import Conversation from "./Conversation";
import { ChatContext } from "../../../context/ChatProvider";
import { getEvaluatorOneChatter } from "../../../api/api";
import { getEvaluatorPreChatter } from "../../../api/api";
import { getActiveEvent } from "../../../api/api";

const Component = styled(Box)`
  overflow: overlay;
  height: 100%;
`;

const StyledDivider = styled(Divider)`
  background-color: grey;
  opacity: 0.6;
`;

const Conversations = ({ text }) => {
  const [groups, setGroups] = useState([]);
  const { receiver, setChatID, user, socket } = useContext(ChatContext);
  const [groupList, setGroupList] = useState([]);
  // const { account, socket, setActiveUsers } = useContext(AccountContext);

  useEffect(() => {
    const fetchChatters = async () => {
      if (user.type === "Supervisor") {
        let data = await getChatters({ supId: user.id });

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
      }
      if (user.type == "Student") {
        let chatter = await getStChatters({ stId: user.id });

        let filteredData = [];
        let groupList = [];
        // data.user.map((chatter) => {
        groupList.push(chatter.user.name);

        if (chatter.user.name.toLowerCase().includes(text.toLowerCase()))
          filteredData.push({ id: chatter.user._id, name: chatter.user.name });

        if (
          chatter.user.supervisorId.name
            .toLowerCase()
            .includes(text.toLowerCase())
        )
          filteredData.push({
            id: chatter.user.supervisorId._id,
            name: chatter.user.supervisorId.name,
          });

        chatter.user.studentID.map((student) => {
          if (student._id !== user.id) {
            if (student.name.toLowerCase().includes(text.toLowerCase()))
              filteredData.push({ id: student._id, name: student.name });
          }
        });

        setGroupList(groupList);
        // });
        setGroups(filteredData);
      }
    };

    fetchChatters();
  }, [text]);

  useEffect(() => {
    const getChatterRefresh = async () => {
      if (receiver) {
        console.log(groupList);
        if (groupList.includes(receiver.name)) {
          // console.log("hI GROUP");
          const groupChatDetails = await setGroupChat({
            sender: user.id,
            groupId: receiver.id,
          });
          setChatID(groupChatDetails.data._id);
        } else {
          const chatDetails = await setChat({
            sender: user.id,
            receiver: receiver.id,
          });
          setChatID(chatDetails.data._id);
        }
      }
    };
    getChatterRefresh();
  }, [receiver]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);

    socket.current.on("getUsers", (users) => {
      console.log(users);
      // setActiveUsers(users);
    });
  }, [user]);

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
