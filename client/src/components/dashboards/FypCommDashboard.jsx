import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import FypNavBar from "../Navbar/FypNavBar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupIcon from "@mui/icons-material/Group";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { getStChatters } from "../../api/api";
import { CircularProgress } from "@mui/material"; // Import CircularProgress
import logo from "../../assets/logo.png";
import { styled } from "@mui/material";
import { ChatContext } from "../../context/ChatProvider";
const Heading = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "2rem",
  left: "50%",
  transform: "translateX(-50%)",
  color: "black",
  fontSize: "2rem",
  fontWeight: "bold",
  fontFamily: "Lucida Bright",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
    top: "1rem",
    fontWeight: "normal",
  },
}));

const AvatarImage = styled("img")({
  width: "5rem",
  height: "5rem",
  borderRadius: "50%",
  marginRight: "1rem",
});

const FypCommDashboard = () => {
  const [open, setOpen] = useState(false); // State for drawer open/close
  const { user } = useContext(ChatContext);
  const [group, setGroup] = useState();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const getGroupInfo = async () => {
      const data = await getStChatters({ stId: user.id });

      setGroup(data);
    };
    getGroupInfo();
  }, []);

  const notifications = 26;
  // const groups = [
  //   {
  //     name: "E-fyp",
  //     members: ["Hammad    (FA19-BSE-111)", "Irfan      (FA19-BSE-110)"],
  //     percentage: 70, // Example percentage value (replace with your actual data)
  //   },
  //   {
  //     name: "Home Lancers",
  //     members: ["Raheem     (FA19-BSE-123)"],
  //     percentage: 50, // Example percentage value (replace with your actual data)
  //   },
  //   {
  //     name: "Cui Help desk",
  //     members: ["Raheem     (FA19-BSE-123)"],
  //     percentage: 50, // Example percentage value (replace with your actual data)
  //   },
  // ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ width: "20%", backgroundColor: "#28282B" }}>
        <FypNavBar />
      </Box>

      <Box
        sx={{
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100vh",
          flexDirection: "row",
          padding: "50px",
          backgroundColor: "lightgrey",
        }}
      >
        <Heading variant="h1">
          <AvatarImage
            src="https://upload.wikimedia.org/wikipedia/commons/c/c0/COMSATS_new_logo.jpg"
            alt="Avatar"
          />
          E-FYP Portal
        </Heading>
        <Box
          sx={{
            backgroundColor: "#28282B",
            boxShadow: "0px 2px 4px #28282B",
            borderRadius: 4,
            color: "white",
            width: "calc(50% - 15px)",
            padding: 2,
            marginBottom: "36px",
            "&:hover": {
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: "16px",
              fontFamily: "Geneva",
              fontWeight: "bold",
            }}
          >
            Notifications
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              marginBottom: "16px",
              backgroundColor: "white",
              color: "black",
              padding: 2,
              borderRadius: 4,
              overflow: "auto",
            }}
          >
            - You have {notifications} notifications
            <br />
            - Project proposal has been approved
            <br />
            - Your task has been approved
            <br />
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#28282B",
            boxShadow: "0px 2px 4px #28282B",
            borderRadius: 4,
            color: "white",
            width: "calc(50% - 15px)",
            padding: 2,
            marginBottom: "36px",
            "&:hover": {
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: "16px",
              fontFamily: "Geneva",
              fontWeight: "bold",
            }}
          >
            Notifications
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              marginBottom: "16px",
              backgroundColor: "white",
              color: "black",
              padding: 2,
              borderRadius: 4,
              overflow: "auto",
            }}
          >
            - You have {notifications} notifications
            <br />
            - Project proposal has been approved
            <br />
            - Your task has been approved
            <br />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FypCommDashboard;
