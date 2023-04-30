import express from "express";
import path from "path";
import {
  getUser,
  getChatters,
  getStChatters,
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
import { getGroupMembers } from "../controllers/group-controller.js";
import {
  assignTask,
  getTasks,
  fetchTasks,
  handleUploadTasks,
  updateTask,
  setPendingTask,
} from "../controllers/task-controller.js";

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
export default route;
