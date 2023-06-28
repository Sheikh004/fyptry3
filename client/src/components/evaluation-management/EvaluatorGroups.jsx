import React, { useEffect, useContext, useState } from "react";
import { getEvaluatorGroups, getEvents } from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
import { Button } from "@mui/material";
function EvaluatorGroups(props) {
  const { user } = useContext(ChatContext);
  const [counter, setCounter] = useState(1);
  useEffect(() => {
    const fetchEvaluatorGroups = async () => {
      //   console.log(user);
      const data0 = await getEvents();
      const filt = data0.filter((event) => {
        if (event.active === false) return event;
      });
      if (filt.length === 1) {
        const data3 = await getEvaluatorGroups(user.id);
        console.log(data3);
      }

      console.log(data0);
    };
    fetchEvaluatorGroups();
  });
  return (
    <div>
      {counter}
      <Button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        nkjkj
      </Button>
    </div>
  );
}

export default EvaluatorGroups;
