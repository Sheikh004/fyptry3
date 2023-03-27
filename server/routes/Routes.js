import express from "express";
import { getUser, getChatters } from "../controllers/userController.js";
import { setChat } from "../controllers/conversationController.js";
const route = express.Router();

route.post("/getUser", getUser);
route.post("/getChatters", getChatters);
route.post("/setChat", setChat);
export default route;
