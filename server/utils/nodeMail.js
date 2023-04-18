import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});
export default transporter;
