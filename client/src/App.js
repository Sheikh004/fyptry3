import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Login from "./components/login/Login";
import ChatDialog from "./components/chat/ChatDialog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedStudent from "./components/protected/ProtectedStudent";
import ProtectedSupervisor from "./components/protected/ProtectedSupervisor";
import ProtectedUser from "./components/protected/ProtectedUser";
import ProtectedFYPCommittee from "./components/protected/ProtectedFYPCommittee";
import ChatProvider from "./context/ChatProvider";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPassword from "./components/login/ResetPassword";
import ViewGroups from "./components/group-management/ViewGroups";
import RegisterGroup from "./components/group-management/RegisterGroup";
import AssignTask from "./components/task-management/AssignTask";
import StudentDetails from "./components/task-management/StudentDetails";
import ProtectedSupervisor_Student from "./components/protected/ProtectedSupervisor_Student";
import StudentTasksView from "./components/task-management/StudentTasksView";
import ViewTask from "./components/task-management/ViewTask";
import SupEvaViewTask from "./components/task-management/SupEvaViewTask";
import StudentDashboard from "./components/dashboards/StudentDashboard";
import Help from "./components/Help/Help";
import GroupProposals from "./components/proposal-management/GroupProposals";
import EditGroup from "./components/group-management/EditGroup";
import Submission from "./components/proposal-management/Submission";
import SupervisorDashboard from "./components/dashboards/SupervisorDashboard";
import FYPComHome from "./components/fyp-committee-panel/FYPComHome";
import RegisterSupervisor from "./components/login/RegisterSupervisor";
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ChatProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/discussion"
              element={
                <ProtectedSupervisor_Student>
                  <ChatDialog />
                </ProtectedSupervisor_Student>
              }
            />
            <Route
              path="/student-dashboard"
              element={
                <ProtectedStudent>
                  <StudentDashboard />
                </ProtectedStudent>
              }
            />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/register-supervisor"
              element={<RegisterSupervisor />}
            />
            <Route
              path="/view-groups"
              element={
                <ProtectedSupervisor>
                  <ViewGroups />
                </ProtectedSupervisor>
              }
            />

            <Route
              path="/view-help"
              element={
                <ProtectedSupervisor_Student>
                  <Help />
                </ProtectedSupervisor_Student>
              }
            />

            <Route
              path="/student-tasks-view"
              element={
                <ProtectedStudent>
                  <StudentTasksView />
                </ProtectedStudent>
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
            <Route
              path="/assign-task"
              element={
                <ProtectedSupervisor>
                  <AssignTask />
                </ProtectedSupervisor>
              }
            />
            <Route
              path="/student-details"
              element={
                <ProtectedSupervisor>
                  <StudentDetails />
                </ProtectedSupervisor>
              }
            />
            <Route
              path="/view-task"
              element={
                <ProtectedStudent>
                  <ViewTask />
                </ProtectedStudent>
              }
            />
            <Route
              path="/sup-eva-view-task"
              element={
                <ProtectedSupervisor>
                  <SupEvaViewTask />
                </ProtectedSupervisor>
              }
            />
            <Route
              path="/group-proposals"
              element={
                <ProtectedSupervisor>
                  <GroupProposals />
                </ProtectedSupervisor>
              }
            />
            <Route
              path="/edit-group"
              element={
                <ProtectedSupervisor>
                  <EditGroup />
                </ProtectedSupervisor>
              }
            />
            <Route
              path="/submission"
              element={
                <ProtectedStudent>
                  <Submission />
                </ProtectedStudent>
              }
            />
            <Route
              path="/supervisor-dashboard"
              element={
                <ProtectedSupervisor>
                  <SupervisorDashboard />
                </ProtectedSupervisor>
              }
            />
            <Route
              path="/fyp-committee-dashboard"
              element={
                <ProtectedFYPCommittee>
                  <FYPComHome />
                </ProtectedFYPCommittee>
              }
            />
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </ChatProvider>
    </LocalizationProvider>
  );
}

export default App;
