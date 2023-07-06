import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../../context/ChatProvider";
import { styled, Box, Typography } from "@mui/material";

import { formatDate } from "../../../utils/common-utils";
import PersonIcon from "@mui/icons-material/Person";
const Component = styled(Box)`
  height: 45px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;

  borderradius: 10px;
`;
const ChatName = styled(Typography)`
  display: block;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  color: "black";
`;

const GroupChatName = styled(Typography)`
  display: block;
  color: rgba(0, 0, 0, 0.6);
  font-size: 15px;
  margin-left: 20px;
  color: black;
  font-weight: bold;
  fontfamily: "Geneva";
`;

const PersonalChatName = styled(Typography)`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
  font-size: 15px;
  // margin-left: 30px;
  color: black;
  border-radius: 50%;
  padding: 5px;
  width: 20vw;
`;
// const Image = styled("img")({
//   width: 50,
//   height: 50,
//   objectFit: "cover",
//   borderRadius: "50%",
//   padding: "0 14px",
// });

// const Container = styled(Box)`
//   display: flex;
// `;

// const Timestamp = styled(Typography)`
//   font-size: 12px;
//   margin-left: auto;
//   color: #00000099;
//   margin-right: 20px;
// `;

const Logo = styled(PersonIcon)`
  margin-right: 5px;
`;

const Text = styled(Typography)`
  display: block;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
`;

const Conversation = ({ chatter, groups }) => {
  console.log(groups);
  console.log(chatter);
  //   const url = user.picture || emptyProfilePicture;

  // const { account, newMessageFlag }  = useContext(AccountContext);

  // const [message, setMessage] = useState({});

  // useEffect(() => {
  //     const getConversationMessage = async() => {
  //         const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
  //         setMessage({ text: data?.message, timestamp: data?.updatedAt });
  //     }
  //     getConversationMessage();
  // }, [newMessageFlag]);
  const { setReceiver, socket, setRoomId } = useContext(ChatContext);
  const getChatter = () => {
    setReceiver(chatter);
    if (groups.includes(chatter.name)) {
      socket.current.emit("joinRoom", chatter.id);
      setRoomId(chatter.id);
    } else {
      // console.log(groups);
      setRoomId(null);
    }
  };

  return (
    <>
      <Component onClick={() => getChatter()}>
        <Box style={{ width: "100%", height: "100%" }}>
          <Component>
            {groups.includes(chatter.name) ? (
              <GroupChatName>{chatter.name}</GroupChatName>
            ) : (
              <PersonalChatName>
                <Logo />
                {chatter.name}
              </PersonalChatName>
            )}
            {/* {message?.text && (
             <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
          )} */}
          </Component>
          {/* <Box>
                     <Text>{message?.text?.includes('localhost') ? 'media' : message.text}</Text>
                 </Box> */}
        </Box>
      </Component>
    </>
  );
};
export default Conversation;
