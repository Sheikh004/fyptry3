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
import verifyToken from "../utils/verifyToken.js";
import {
  forgotPasswordMail,
  resetPassword,
} from "../controllers/passwordController.js";
import { getGroupMembers } from "../controllers/group-controller.js";
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

export default route;
