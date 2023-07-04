import { useState, useEffect, useContext, useRef } from "react";
import { Box, styled } from "@mui/material";
import { ChatContext } from "../../../context/ChatProvider";
import { io } from "socket.io-client";

import { createMessage, getMessages } from "../../../api/api";

//components
import Message from "./Message";
import Footer from "./Footer";

const Wrapper = styled(Box)`
  //background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
  background: #0b2b40;
  background-size: 50%;
`;

const StyledFooter = styled(Box)`
  height: 55px;
  background: #ededed;
  // position: absolute;
  width: 100%;
  // bottom: 0
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 80px;
`;

const Messages = ({ receiver, chatID }) => {
  const [messages, setMessages] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const [value, setValue] = useState("");
  const [file, setFile] = useState();
  const [form, setForm] = useState();
  const { user, socket, roomId } = useContext(ChatContext);
  const [newBool, setNewBool] = useState(false);
  const scrollRef = useRef();

  // const { account, socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext);

  useEffect(() => {
    socket.current.on("message", (data) => {
      setNewMessageFlag(!newMessageFlag);
      setNewBool(!newBool);
      console.log(data);
    });
    socket.current.on("getMessage", (data) => {
      // console.log(data);
      // console.log(messages);
      setNewMessageFlag(!newMessageFlag);
      setNewBool(!newBool);
      // sendText(data);
      // setMessages({
      //   ...messages,
      //   ...data,
      //   createdAt: Date.now(),
      // });
      console.log(data);
    });
  }, [newBool, newMessageFlag]);

  useEffect(() => {
    const getMessageDetails = async () => {
      // console.log(chatID);
      let data = await getMessages(chatID);
      console.log(data);
      if (data) setMessages(data);
      // console.log(typeof messages);
    };
    getMessageDetails();
  }, [chatID, receiver.id, newMessageFlag, newBool]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [messages]);

  //   useEffect(() => {
  //     incomingMessage &&
  //       conversation?.members?.includes(incomingMessage.senderId) &&
  //       setMessages((prev) => [...prev, incomingMessage]);
  //   }, [incomingMessage, conversation]);

  // const receiverId = conversation?.members?.find(
  //   (member) => member !== account.sub
  // );

  const sendText = async (e) => {
    let code = e.key;
    if (!value) return;

    if (code === "Enter") {
      let message = {};
      if (!file) {
        message = {
          senderId: user.id,
          senderName: user.name,
          receiverId: receiver.id,
          conversationId: chatID,
          type: "text",
          text: value,
        };
      } else {
        message = {
          senderId: user.id,
          senderName: user.name,
          conversationId: chatID,
          receiverId: receiver.id,
          type: "file",
          text: form,
        };
        console.log(form);
      }
      // console.log(message);
      await createMessage(message);
      setValue("");
      setFile();
      setForm("");
      setNewMessageFlag(!newMessageFlag);
      if (roomId && roomId === receiver.id) {
        console.log("Yes");
        socket.current.emit("chatMessage", message);
      } else {
        console.log(receiver.id);
        console.log(roomId);
        socket.current.emit("sendMessage", message);
      }
    }
  };

  return (
    <Wrapper>
      <Component>
        {messages &&
          messages.map((message) => (
            <Container ref={scrollRef} key={message._id}>
              <Message message={message} key={message._id} />
            </Container>
          ))}
      </Component>
      <Footer
        sendText={sendText}
        value={value}
        setValue={setValue}
        setFile={setFile}
        file={file}
        setForm={setForm}
      />
    </Wrapper>
  );
};

export default Messages;
