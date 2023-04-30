import { Box, Typography, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { formatDate2, formatTimeAMPM2 } from "../../utils/common-utils";
import { useLocation } from "react-router-dom";
function SupEvaViewTask(props) {
  const location = useLocation();
  const [supEvaTask, setSupEvaTask] = useState();
  useEffect(() => {
    setSupEvaTask(location.state);
  }, []);
  return (
    <Box>
      <Typography>Title</Typography>
      <Typography>{location.state.title}</Typography>
      <Typography>Description</Typography>
      <Typography>{location.state.description}</Typography>
      <Typography>Due Date</Typography>
      <Typography>Date: {formatDate2(location.state.deadline)}</Typography>
      <Typography>Time: {formatTimeAMPM2(location.state.deadline)}</Typography>
      <Box>
        {supEvaTask &&
          supEvaTask.filespaths.length !== 0 &&
          supEvaTask.filespaths.map((task, index) => {
            return (
              <Link href={task} target="_blank" rel="noopener" key={index}>
                {task.split("--").pop()}
              </Link>
            );
          })}
      </Box>
    </Box>
  );
}

export default SupEvaViewTask;
