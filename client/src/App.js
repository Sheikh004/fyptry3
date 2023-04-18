import "./App.css";
import Login from "./components/login/Login";

import ChatDialog from "./components/chat/ChatDialog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ChatProvider from "./context/ChatProvider";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPassword from "./components/login/ResetPassword";
function App() {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SupervisorHome" element={<ChatDialog />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
}

export default App;
