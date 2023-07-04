import express from "express";
import path from "path";
import {
  getUser,
  getChatters,
  getStChatters,
  registerSupervisor,
  getEvaluatorOneChatter,
  getEvaluatorPreChatter,
} from "../controllers/userController.js";
import {
  setChat,
  setGroupChat,
} from "../controllers/conversationController.js";
import {
  getMessages,
  createMessage,
} from "../controllers/message-controller.js";
import { createFileUrl } from "../controllers/fileController.js";
import { upload } from "../utils/uploadFile.js";
import { upload2 } from "../utils/uploadFile2.js";
import verifyToken from "../utils/verifyToken.js";
import {
  forgotPasswordMail,
  resetPassword,
} from "../controllers/passwordController.js";
import {
  getGroupMembers,
  getSupervisorGroups,
  getGroupLeader,
  getGroup,
  updateGroupMembers,
  deleteGroup,
  getUnAssignedGroupsOne,
  getUnAssignedPreGroups,
  getUnAssignedGroupsTwo,
} from "../controllers/group-controller.js";
import {
  assignTask,
  getTasks,
  fetchTasks,
  handleUploadTasks,
  updateTask,
  setPendingTask,
  setCompletedTask,
  removeFile,
  updateTaskApproval,
} from "../controllers/task-controller.js";
import {
  getSupervisorProposals,
  createProposal,
  updateProposalStatus,
  unUpdateProposalStatus,
  removeProposal,
  getUnAssignedProposals,
  getReviewers,
  assignProposal,
  unassignProposal,
  getReviewerProposals,
  updateProposalReviewerStatus,
  getGroupProposal,
} from "../controllers/proposal-controller.js";
import {
  createComment,
  getComments,
  deleteComment,
  getGroupComments,
  createTaskComment,
} from "../controllers/commentController.js";
import {
  createNotification,
  createNotificationBroadcast,
} from "../controllers/notification-controller.js";
import {
  assignGroupOne,
  unassignGroupOne,
  assignPreGroup,
  unassignPreGroup,
  assignGroupTwo,
  unassignGroupTwo,
  getEvaluatorsOne,
  getPreEvaluators,
  getEvaluatorsTwo,
  getEvaluatorOneGroups,
  getEvaluatorPreGroups,
  getEvaluatorTwoGroups,
} from "../controllers/evaluation-controller.js";
import {
  createEvent,
  getActiveEvent,
  getEvents,
} from "../controllers/event-controller.js";
// import { zoomAuth } from "../controllers/zoomController.js";

const route = express.Router();
route.post("/getUser", getUser);
route.post("/getChatters", verifyToken, getChatters);
route.post("/getGroupMembers", verifyToken, getGroupMembers);
route.post("/getStChatters", verifyToken, getStChatters);
route.post("/setChat", verifyToken, setChat);
route.post("/setGroupChat", verifyToken, setGroupChat);
route.get("/getMessages/get/:id", verifyToken, getMessages);
route.post("/createMessage", verifyToken, createMessage);
route.post("/file/upload", verifyToken, upload.single("file"), createFileUrl);
route.post("/fEmail", forgotPasswordMail);
route.post("/reset-password", resetPassword);
route.post("/assignTask", verifyToken, assignTask);
route.post("/getTasks", verifyToken, getTasks);
route.post("/fetchTasks", verifyToken, fetchTasks);
route.post(
  "/handleUploadTasks",
  verifyToken,
  upload2.array("files", 7),
  handleUploadTasks
);
route.post("/updateTask", verifyToken, updateTask);
route.post("/setPendingTask", verifyToken, setPendingTask);
route.post("/setCompletedTask", verifyToken, setCompletedTask);
route.get("/getSupervisorGroups/:id", verifyToken, getSupervisorGroups);
route.get("/getSupervisorProposals/:id", verifyToken, getSupervisorProposals);
route.get("/getGroupLeader/:id", verifyToken, getGroupLeader);
route.get("/getGroup/:id", verifyToken, getGroup);
route.post("/register-supervisor", registerSupervisor);
route.get(
  "/updateProposalStatus/:approvalProposal",
  verifyToken,
  updateProposalStatus
);
route.get(
  "/unUpdateProposalStatus/:unApprovalProposal",
  verifyToken,
  unUpdateProposalStatus
);
route.post("/createProposal", verifyToken, createProposal);
route.post("/updateGroupMembers", verifyToken, updateGroupMembers);
route.delete("/deleteGroup/:id", verifyToken, deleteGroup);
route.delete("/removeFile/:id", verifyToken, removeFile);
route.delete("/removeProposal/:id", verifyToken, removeProposal);
route.patch("/updateTaskApproval/:id", verifyToken, updateTaskApproval);
route.get("/getUnAssignedProposals", verifyToken, getUnAssignedProposals);
route.get("/getReviewers", verifyToken, getReviewers);
route.patch("/assignProposal/:pid/:rid", verifyToken, assignProposal);
route.patch("/unassignProposal/:pid/:rid", verifyToken, unassignProposal);
route.get("/getReviewerProposals/:id", verifyToken, getReviewerProposals);
route.patch(
  "/updateProposalReviewerStatus/:pid/:value",
  verifyToken,
  updateProposalReviewerStatus
);
route.post("/createComment", verifyToken, createComment);
route.post("/createTaskComment", verifyToken, createTaskComment);
route.get("/getComments/:pid/:fid", verifyToken, getComments);
route.delete("/deleteComment/:cid", verifyToken, deleteComment);
route.get("/getGroupProposal/:gid", verifyToken, getGroupProposal);
route.get("/getGroupComments/:pid", verifyToken, getGroupComments);

route.get("/getUnAssignedGroupsOne", verifyToken, getUnAssignedGroupsOne);
route.get("/getUnAssignedPreGroups", verifyToken, getUnAssignedPreGroups);
route.get("/getUnAssignedGroupsTwo", verifyToken, getUnAssignedGroupsTwo);
route.patch("/unassignGroupOne/:gid/:e_Id", verifyToken, unassignGroupOne);
route.patch("/assignGroupOne/:gid/:e_Id", verifyToken, assignGroupOne);
route.patch("/unassignPreGroup/:gid/:e_Id", verifyToken, unassignPreGroup);
route.patch("/assignPreGroup/:gid/:e_Id", verifyToken, assignPreGroup);
route.patch("/unassignGroupTwo/:gid/:e_Id", verifyToken, unassignGroupTwo);
route.patch("/assignGroupTwo/:gid/:e_Id", verifyToken, assignGroupTwo);
route.get("/getEvaluatorsOne", verifyToken, getEvaluatorsOne);
route.get("/getPreEvaluators", verifyToken, getPreEvaluators);
route.get("/getEvaluatorsTwo", verifyToken, getEvaluatorsTwo);
route.post("/createEvent", verifyToken, createEvent);
route.get("/getEvents", verifyToken, getEvents);
route.get("/getActiveEvent", verifyToken, getActiveEvent);
route.get(
  "/getEvaluatorOneGroups/:user_id",
  verifyToken,
  getEvaluatorOneGroups
);
route.get(
  "/getEvaluatorPreGroups/:user_id",
  verifyToken,
  getEvaluatorPreGroups
);
route.get(
  "/getEvaluatorTwoGroups/:user_id",
  verifyToken,
  getEvaluatorTwoGroups
);
route.get("/getEvaluatorOneChatter/:g_Id", verifyToken, getEvaluatorOneChatter);
route.get("/getEvaluatorPreChatter/:g_Id", verifyToken, getEvaluatorPreChatter);
route.post("/createNotification", verifyToken, createNotification);
route.post(
  "/createNotificationBroadcast",
  verifyToken,
  createNotificationBroadcast
);
// route.post("/zoomAuth", zoomAuth);

export default route;
