import express from "express";
import path from "path";
import {
  getUser,
  getChatters,
  getStChatters,
} from "../controllers/userController.js";
import { setChat } from "../controllers/conversationController.js";
import {
  getMessages,
  createMessage,
} from "../controllers/message-controller.js";
import { createFileUrl } from "../controllers/fileController.js";
import { upload } from "../utils/uploadFile.js";
import verifyToken from "../utils/verifyToken.js";
const route = express.Router();

route.post("/getUser", getUser);
route.post("/getChatters", verifyToken, getChatters);
route.post("/getStChatters", verifyToken, getStChatters);
route.post("/setChat", verifyToken, setChat);
route.get("/getMessages/get/:id", verifyToken, getMessages);
route.post("/createMessage", verifyToken, createMessage);
route.post("/file/upload", verifyToken, upload.single("file"), createFileUrl);

export default route;
