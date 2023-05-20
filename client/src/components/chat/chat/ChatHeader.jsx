import { useContext } from "react";

import { Box, Typography, styled } from "@mui/material";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import { Search, MoreVert } from "@mui/icons-material";

const Header = styled(Box)`
  height: 44px;
  background: #052f72;
  display: flex;
  padding: 8px 16px;
  align-items: center;

  @media (max-width: 600px) {
    padding: 8px;
  }
`;

const Image = styled("img")({
  width: 40,
  height: 40,
  objectFit: "cover",
  borderRadius: "50%",
});

const Name = styled(Typography)`
  margin-left: 12px !important;
`;

const RightContainer = styled(Box)`
  margin-left: auto;
  & > svg {
    padding: 8px;
    font-size: 22px;
    color: #000;
  }
`;

const Status = styled(Typography)`
  font-size: 12px !important;
  color: rgb(0, 0, 0, 0.6);
  margin-left: 12px !important;
`;

const ChatHeader = ({ receiver }) => {
  // const url = person.picture || defaultProfilePicture;

  // const { activeUsers } = useContext(AccountContext);

  return (
    <Header>
      {/* <Image src={url} alt="display picture" /> */}
      <Box style={{ width: "90%" }}>
        <Name style={{ fontSize: 20 }}>{receiver.name}</Name>
      </Box>
      <VideoCameraBackIcon style={{ width: "10%", color: "White" }} />
    </Header>
  );
};

export default ChatHeader;
