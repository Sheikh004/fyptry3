// for supervisor chat
import React from "react";
import { useState, useEffect, useContext } from "react";
import { setChat, setGroupChat } from "../../../api/api";
import { Box, styled, Divider } from "@mui/material";

import { getChatters, getStChatters } from "../../../api/api";

//components
import Conversation from "./Conversation";
import { ChatContext } from "../../../context/ChatProvider";

const Component = styled(Box)`
  overflow: overlay;
  height: 100%;
`;

const StyledDivider = styled(Divider)`
  background-color: #e9edef;
  opacity: 0.6;
`;

const Conversations = ({ text }) => {
  const [groups, setGroups] = useState([]);
  const { receiver, setChatID, user } = useContext(ChatContext);
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
        let data = await getStChatters({ stId: user.id });

        let filteredData = [];
        let groupList = [];
        data.user.map((chatter) => {
          groupList.push(chatter.name);
          if (chatter.name.toLowerCase().includes(text.toLowerCase()))
            filteredData.push({ id: chatter._id, name: chatter.name });

          if (
            chatter.supervisorId.name.toLowerCase().includes(text.toLowerCase())
          )
            filteredData.push({
              id: chatter.supervisorId._id,
              name: chatter.supervisorId.name,
            });

          chatter.studentID.map((student) => {
            if (student._id !== user.id) {
              if (student.name.toLowerCase().includes(text.toLowerCase()))
                filteredData.push({ id: student._id, name: student.name });
            }
          });

          setGroupList(groupList);
        });
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
