import { useContext, useState, useEffect } from "react";

import { Box } from "@mui/material";

import { ReceiverContext } from "../../../context/ReceiverProvider";
// import { getConversation } from "../../../service/api";

//components
import ChatHeader from "./ChatHeader";
// import Messages from "./Messages";

const ChatBox = () => {
  const { receiver } = useContext(ReceiverContext);

  const [conversation, setConversation] = useState({});

  // useEffect(() => {
  //   const getConversationDetails = async () => {
  //     let data = await getConversation({
  //       senderId: "641800d14c144769799107e6",
  //       receiverId: receiver.studentId,
  //     });
  //     setConversation(data);
  //   };
  //   getConversationDetails();
  // }, [receiver.studentId]);

  return (
    <Box style={{ height: "75%" }}>
      <ChatHeader receiver={receiver} />
      {/* {<Messages receiver={receiver} conversation={conversation} />} */}
    </Box>
  );
};

export default ChatBox;
