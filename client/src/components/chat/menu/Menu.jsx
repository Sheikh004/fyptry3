import { useState } from "react";

import { Box } from "@mui/material";

//components

import Search from "./Search";
import Conversations from "./Conversations";

const Menu = () => {
  const [text, setText] = useState("");

  return (
    <Box style={{ backgroundColor: "#0b2b40" }}>
      <Search setText={setText} />
      <Conversations text={text} />
    </Box>
  );
};

export default Menu;
