import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Login from "./components/login/Login";
import ChatDialog from "./components/chat/ChatDialog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedStudent from "./components/protected/ProtectedStudent";
import ProtectedSupervisor from "./components/protected/ProtectedSupervisor";
import ProtectedUser from "./components/protected/ProtectedUser";
import ProtectedReviewer from "./components/protected/ProtectedReviewer";
import ProtectedFaculty from "./components/protected/ProtectedFaculty";
import ProtectedFYPCommittee from "./components/protected/ProtectedFYPCommittee";
import ProtectedEvaluator from "./components/protected/ProtectedEvaluator";
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
import ReviewerManagement from "./components/fyp-committee-panel/ReviewerManagement";
import ReviewerDashboard from "./components/dashboards/ReviewerDashboard";
import ReviewerGroupProposals from "./components/proposal-management/ReviewerGroupProposals";
import EvaluatorManagement from "./components/fyp-committee-panel/EvaluatorManagement";
import EventManagement from "./components/fyp-committee-panel/EventManagement";
import EvaluatorGroups from "./components/evaluation-management/EvaluatorGroups";
import EditPreference from "./components/dashboards/EditPreference";
import Template from "./components/template-management/Template";
import TemplateList from "./components/template-management/TemplateList";
import FypCommDashboard from "./components/dashboards/FypCommDashboard";

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
                  <FypCommDashboard />
                </ProtectedFYPCommittee>
              }
            />
            <Route
              path="/reviewer-management"
              element={
                <ProtectedFYPCommittee>
                  <ReviewerManagement />
                </ProtectedFYPCommittee>
              }
            />
            <Route
              path="/evaluator-management"
              element={
                <ProtectedFYPCommittee>
                  <EvaluatorManagement />
                </ProtectedFYPCommittee>
              }
            />
            <Route
              path="/reviewer-dashboard"
              element={
                <ProtectedReviewer>
                  <ReviewerDashboard />
                </ProtectedReviewer>
              }
            />
            <Route
              path="/reviewer-group-proposals"
              element={
                <ProtectedReviewer>
                  <ReviewerGroupProposals />
                </ProtectedReviewer>
              }
            />
            <Route
              path="/event-management"
              element={
                <ProtectedFYPCommittee>
                  <EventManagement />
                </ProtectedFYPCommittee>
              }
            />
            <Route
              path="/evaluator-groups"
              element={
                <ProtectedEvaluator>
                  <EvaluatorGroups />
                </ProtectedEvaluator>
              }
            />
            <Route
              path="/edit-preference"
              element={
                <ProtectedFaculty>
                  <EditPreference />
                </ProtectedFaculty>
              }
            />
            <Route
              path="/template-list"
              element={
                <ProtectedStudent>
                  <TemplateList />
                </ProtectedStudent>
              }
            />
            <Route
              path="/template"
              element={
                <ProtectedFYPCommittee>
                  <Template />
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
