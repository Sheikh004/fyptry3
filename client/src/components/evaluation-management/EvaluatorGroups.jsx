import React, { useEffect, useContext, useState } from "react";
import {
  getEvaluatorOneGroups,
  getEvaluatorPreGroups,
  getEvaluatorTwoGroups,
  getEvents,
} from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
import { Box, Button, Typography } from "@mui/material";

function EvaluatorGroups(props) {
  const { user } = useContext(ChatContext);

  const [fypGroups, setFypGroups] = useState();
  useEffect(() => {
    const fetchEvaluatorGroups = async () => {
      //   console.log(user);
      const data0 = await getEvents();
      if (data0 && data0.length === 1) {
        if (data0[0].name === "FYP-I") {
          const data1 = await getEvaluatorOneGroups(user.id);
          console.log(data1);
          if (data1 && data1.groupList) {
            setFypGroups(data1.groupList);
          }
        }
        if (data0[0].name === "Pre-FYP") {
          const data2 = await getEvaluatorPreGroups(user.id);
          // console.log(data2);
          if (data2 && data2.groupList) {
            setFypGroups(data2.groupList);
          }
        }
        if (data0[0].name === "FYP-II") {
          const data3 = await getEvaluatorTwoGroups(user.id);
          // console.log(data3);
          if (data3 && data3.groupList) {
            setFypGroups(data3.groupList);
          }
        }
      }

      // console.log(data0);
    };
    fetchEvaluatorGroups();
  }, []);
  return (
    <div>
      <h1>Assigned FYP Groups</h1>
      {fypGroups &&
        fypGroups.map((group) => {
          return (
            <Box>
              <Typography>Group Name: {group.name}</Typography>

              <Typography>Group Members: </Typography>

              {group.studentID.length > 0 &&
                group.studentID.map((student) => {
                  return (
                    <Box>
                      <Typography>{student.name}</Typography>
                      <Button>Grade</Button>
                    </Box>
                  );
                })}

              <Typography>
                Supervisor:{" "}
                {group.supervisorId._id && group.supervisorId._id.name}
              </Typography>
            </Box>
          );
        })}
    </div>
  );
}

export default EvaluatorGroups;
