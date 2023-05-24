import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupIcon from "@mui/icons-material/Group";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import logo from "../../assets/logo.png";
import { getChatters } from "../../api/api";
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

const SupervisorDashboard = () => {
  const [open, setOpen] = useState(false); // State for drawer open/close
  const { user } = useContext(ChatContext);
  const [sGroups, setSGroups] = useState();
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const notifications = 26;
  const groups = [
    {
      name: "E-fyp",
      members: ["Hammad    (FA19-BSE-111)", "Irfan      (FA19-BSE-110)"],
      percentage: 70, // Example percentage value (replace with your actual data)
    },
    {
      name: "Home Lancers",
      members: ["Raheem     (FA19-BSE-123)"],
      percentage: 50, // Example percentage value (replace with your actual data)
    },
    {
      name: "Cui Help desk",
      members: ["Raheem     (FA19-BSE-123)"],
      percentage: 50, // Example percentage value (replace with your actual data)
    },
  ];

  useEffect(() => {
    const sGroupInfo = async () => {
      const data = await getChatters({ supId: user.id });
      console.log(data);
      setSGroups(data);
    };
    sGroupInfo();
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ width: "20%", backgroundColor: "#28282B" }}>
        <SupervisorNavbar onDrawerToggle={handleDrawerToggle} />
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
            You have {notifications} notifications
            <br />
            gt
            <br />
            hyh
            <br />
            uju
          </Typography>
        </Box>
        <Box
          sx={{
            width: "calc(50% - 16px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            Registered Groups
          </Typography>
          {sGroups && sGroups.user.length === 0 && (
            <Typography
              variant="body2"
              sx={{ color: "black", display: "block" }}
            >
              No Groups have been registered yet
            </Typography>
          )}
          {sGroups &&
            sGroups.user.map((group) => (
              <Card
                key={group.name}
                sx={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "2px 2px 4px #28282B",
                  borderRadius: 4,
                  width: "100%",
                  marginBottom: "20px",
                  "&:last-child": {
                    marginBottom: 0,
                  },
                  "&:hover": {
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", marginBottom: "10px" }}
                  >
                    {group.name}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ flex: 1 }}>
                      {group.studentID.map((member, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{ color: "black", display: "block" }}
                        >
                          {member.name}
                        </Typography>
                      ))}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: 2,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "bold", marginRight: 1 }}
                        >
                          67%
                        </Typography>
                        <CircularProgress
                          variant="determinate"
                          value={67}
                          size={40}
                          thickness={10}
                          color="primary"
                        />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Box>
      </Box>
      <Drawer
        sx={{ width: 240 }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Registered Groups" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default SupervisorDashboard;
