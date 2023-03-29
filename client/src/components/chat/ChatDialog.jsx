import { useContext } from "react";
import { Dialog, styled, Box } from "@mui/material";

//components
import Menu from "./menu/Menu";
import EmptyChat from "./chat/EmptyChat";
import { ReceiverContext } from "../../context/ReceiverProvider";
import ChatBox from "./chat/ChatBox";

const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)`
  min-width: 450px;
`;

const RightComponent = styled(Box)`
  width: 73%;
  min-width: 300px;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.14);
`;

const dialogStyle = {
  height: "95%",
  width: "100%",
  margin: "20px",
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: 0,
  boxShadow: "none",
  overflow: "hidden",
};

const ChatDialog = () => {
  const { receiver } = useContext(ReceiverContext);

  return (
    <Dialog
      open={true}
      BackdropProps={{ style: { backgroundColor: "unset" } }}
      PaperProps={{ sx: dialogStyle }}
      maxWidth={"md"}
    >
      <Component>
        <LeftComponent>
          <Menu />
        </LeftComponent>
        <RightComponent>
          {receiver == null ? <EmptyChat /> : <ChatBox />}
        </RightComponent>
      </Component>
    </Dialog>
  );
};

export default ChatDialog;
