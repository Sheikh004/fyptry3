import "./App.css";
import Login from "./components/login/Login";

import ChatDialog from "./components/chat/ChatDialog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedStudent from "./components/protected/ProtectedStudent";
import ProtectedSupervisor from "./components/protected/ProtectedSupervisor";
import ProtectedUser from "./components/protected/ProtectedUser";
import ChatProvider from "./context/ChatProvider";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPassword from "./components/login/ResetPassword";
import ViewGroups from "./components/group-management/ViewGroups";
import RegisterGroup from "./components/group-management/RegisterGroup";

function App() {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/SupervisorHome"
            element={
              <ProtectedSupervisor>
                <ChatDialog />
              </ProtectedSupervisor>
            }
          />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/view-groups"
            element={
              <ProtectedSupervisor>
                <ViewGroups />
              </ProtectedSupervisor>
            }
          />
          <Route
            path="/register-group"
            element={
              <ProtectedSupervisor>
                <RegisterGroup />
              </ProtectedSupervisor>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
}

export default App;
