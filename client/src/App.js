import "./App.css";
import Login from "./components/login/Login";

import ChatDialog from "./components/chat/ChatDialog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Routing from "./routes/Routing";
import ChatProvider from "./context/ChatProvider";
function App() {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SupervisorHome" element={<ChatDialog />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
}

export default App;
