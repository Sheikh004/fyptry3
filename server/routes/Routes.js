import express from "express";
import path from "path";
import { getUser, getChatters } from "../controllers/userController.js";
import { setChat } from "../controllers/conversationController.js";
import {
  getMessages,
  createMessage,
} from "../controllers/message-controller.js";
import { createFileUrl } from "../controllers/fileController.js";
import { upload } from "../utils/uploadFile.js";
const route = express.Router();

route.post("/getUser", getUser);
route.post("/getChatters", getChatters);
route.post("/setChat", setChat);
route.get("/getMessages/get/:id", getMessages);
route.post("/createMessage", createMessage);
route.post("/file/upload", upload.single("file"), createFileUrl);

export default route;
