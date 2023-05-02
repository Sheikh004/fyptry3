import { useContext } from "react";
import { Dialog, styled, Box } from "@mui/material";

//components
import Menu from "./menu/Menu";
import EmptyChat from "./chat/EmptyChat";
import { ChatContext } from "../../context/ChatProvider";
import ChatBox from "./chat/ChatBox";
import NavBar from "../NavBar";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";

const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)`
  min-width: 450px;
  padding-top: 5px;
`;

const RightComponent = styled(Box)`
  width: 73%;
  min-width: 300px;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.14);
  padding-top: 5px;
`;

const ChatDialog = () => {
  const { receiver, user } = useContext(ChatContext);

  return (
    <Box>
      {user && user.type == "Supervisor" && <SupervisorNavbar />}
      {user && user.type == "Student" && <NavBar />}

      <Box>
        <Component>
          <LeftComponent>
            <Menu />
          </LeftComponent>
          <RightComponent>
            {receiver == null ? <EmptyChat /> : <ChatBox />}
          </RightComponent>
        </Component>
      </Box>
    </Box>
  );
};

export default ChatDialog;
