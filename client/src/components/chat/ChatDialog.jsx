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
  height: 100vh;
  background-color: #0b2b40;
  @media (max-width: 768px) {
    height: 100vh;
  }
  padding: 20;
`;

const LeftComponent = styled(Box)`
  min-width: 400px;
  background-color: #052f72;
  padding: 1rem;
  min-height: 100px;
  @media (max-width: 768px) {
    min-width: unset;
  }
`;

const RightComponent = styled(Box)`
  flex: 1;
  min-width: 300px;
  height: 100vh;
  border-left: 1px solid rgba(0, 0, 0, 0.14);
  background-color: #12222f;
  padding: 1rem;

  @media (max-width: 768px) {
    border-left: none;
    border-top: 1px solid rgba(0, 0, 0, 0.14);
    min-width: unset;
    height: unset;
  }
`;
const dialogStyle = {
  height: "100vh" /* Set full height */,
  width: "100vw",
  margin: 0 /* Remove margin */,

  padding: 0 /* Remove padding */,
  maxWidth: "100vw",
  maxHeight: "100vh",
  borderRadius: 0,
  boxShadow: "none",
};
const ChatDialog = () => {
  const { receiver, user } = useContext(ChatContext);

  return (
    <Dialog
      open={true}
      BackdropProps={{ style: { backgroundColor: "unset" } }}
      PaperProps={{ sx: dialogStyle }}
      maxWidth={"md"}
      fullWidth /* Set full width */
    >
      {user && user.type == "Supervisor" && <SupervisorNavbar />}
      {user && user.type == "Student" && <NavBar />}
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
