import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../../context/ChatProvider";
import { Box } from "@mui/material";

//components
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

const ChatBox = () => {
  const { receiver, chatID } = useContext(ChatContext);

  const [conversation, setConversation] = useState({});

  return (
    <Box style={{ height: "auto" }}>
      <ChatHeader receiver={receiver} />
      {<Messages receiver={receiver} chatID={chatID} />}
    </Box>
  );
};

export default ChatBox;
