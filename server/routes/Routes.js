import express from "express";
import { getUser } from "../controllers/userController.js";

const route = express.Router();

route.post("/getUser", getUser);

export default route;
