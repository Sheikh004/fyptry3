import { createContext, useState } from "react";
import React from "react";

export const ReceiverContext = createContext(null);
const ReceiverProvider = ({ children }) => {
  const [receiver, setReceiver] = useState(null);
  return (
    <ReceiverContext.Provider value={{ receiver, setReceiver }}>
      {children}
    </ReceiverContext.Provider>
  );
};
export default ReceiverProvider;
