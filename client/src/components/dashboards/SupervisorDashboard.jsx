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
          backgroundColor: "#0b2b40",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "white", padding: 2, borderRadius: 4 }}
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
            backgroundColor: "#81007f",
            color: "white",
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" sx={{ marginY: "16px" }}>
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
          <Typography variant="h6" sx={{ marginY: "16px" }}>
            Registered Groups
          </Typography>
          {groups.map((group) => (
            <Box
              key={group.name}
              sx={{
                marginY: "8px",
                backgroundColor: "#ccc",
                padding: "4px",
                borderRadius: 4,
              }}
            >
              <Typography variant="subtitle2">{group.name}</Typography>
              {group.members.map((member, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ color: "#666", display: "block" }}
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
