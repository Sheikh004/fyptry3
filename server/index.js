import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Routes from "./routes/Routes.js";
import Connection from "./database/db.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
dotenv.config();
const app = express();

const corsOptions = {
  exposedHeaders: "Authorization",
};

app.use(cors(corsOptions));
const PORT = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static("./uploads/"));

app.use("/", Routes);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);
app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);
