import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";

const SupervisorDashboard = () => {
  const notifications = 26;
  const groups = [
    {
      name: "Group 1",
      members: ["Hammad    (FA19-BSE-111)", "Irfan      (FA19-BSE-110"],
    },
    { name: "Group 2", members: ["Raheem     (FA19-BSE-123)"] },
  ];

  return (
    <Box>
      <SupervisorNavbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#0490db",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "white",
            padding: 2,
            borderRadius: 4,
            fontWeight: "bold",
          }}
        >
          Welcome to the E-FYP portal
        </Typography>
        <Box
          sx={{
            border: "1px solid #ccc",
            padding: "60px",
            textAlign: "left",
            maxWidth: "600px",
            width: "90%",
            backgroundColor: "#052f72",
            color: "white",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h6"
            sx={{ marginY: "16px", fontFamily: "Geneva", fontWeight: "bold" }}
          >
            Notifications
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              marginY: "16px",
              backgroundColor: "white",
              color: "black",
              padding: 2,
              borderRadius: 4,
            }}
          >
            You have {notifications} notifications
          </Typography>
          <Typography
            variant="h6"
            sx={{ marginY: "16px", fontFamily: "Geneva", fontWeight: "bold" }}
          >
            Registered Groups
          </Typography>
          {groups.map((group) => (
            <Box
              key={group.name}
              sx={{
                marginY: "8px",
                // backgroundColor: "#ccc",
                padding: "4px",
                borderRadius: 4,
              }}
            >
              <Typography variant="subtitle2" style={{ fontweight: "bold" }}>
                <u>{group.name}</u>
              </Typography>
              {group.members.map((member, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ color: "white", display: "block" }}
                >
                  {member}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SupervisorDashboard;
