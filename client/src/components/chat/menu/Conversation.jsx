import { useContext, useEffect, useState } from "react";
import { ReceiverContext } from "../../../context/ReceiverProvider";
import { styled, Box, Typography } from "@mui/material";

import { formatDate } from "../../../utils/common-utils";

const Component = styled(Box)`
  height: 45px;
  display: flex;
  padding: 13px 0;
  cursor: pointer;
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

const Text = styled(Typography)`
  display: block;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
`;

const Conversation = ({ student, group }) => {
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
  const { setReceiver } = useContext(ReceiverContext);
  const getChatter = () => {
    setReceiver(student);
  };

  const getGroupChatters = () => {};

  return (
    <>
      {group?.groupName && (
        <Component onClick={() => getGroupChatters()}>
          <Box style={{ width: "100%" }}>
            <Component>
              <Typography>{group?.groupName}</Typography>

              {/* {message?.text && (
            <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
          )} */}
            </Component>
            {/* <Box>
                    <Text>{message?.text?.includes('localhost') ? 'media' : message.text}</Text>
                </Box> */}
          </Box>
        </Component>
      )}{" "}
      {student?.studentName && (
        <Component onClick={() => getChatter()}>
          <Box style={{ width: "100%" }}>
            <Component>
              <Text>{student?.studentName}</Text>

              {/* {message?.text && (
             <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
          )} */}
            </Component>
            {/* <Box>
                     <Text>{message?.text?.includes('localhost') ? 'media' : message.text}</Text>
                 </Box> */}
          </Box>
        </Component>
      )}
    </>
    // <Component onClick={()=>getChatter()}>
    //   <Box style={{ width: "100%" }}>
    //     <Component>
    //       {group?.groupName && <Typography>{group.groupName}</Typography>}
    //       {student?.studentName && <Text>{student.studentName}</Text>}

    //       {/* {message?.text && (
    //         <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
    //       )} */}
    //     </Component>
    //     {/* <Box>
    //                 <Text>{message?.text?.includes('localhost') ? 'media' : message.text}</Text>
    //             </Box> */}
    //   </Box>
    // </Component>
  );
};
export default Conversation;
