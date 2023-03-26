import express from "express";
import { getUser, getChatters } from "../controllers/userController.js";

const route = express.Router();

route.post("/getUser", getUser);
route.post("/getChatters", getChatters);
export default route;
