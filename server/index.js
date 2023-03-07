import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import Routes from "./routes/Routes.js";
import Connection from "./database/db.js";

dotenv.config();
const app = express();
app.use(cors());
const PORT = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", Routes);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);
app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);
