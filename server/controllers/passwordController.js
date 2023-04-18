import jwt from "jsonwebtoken";
import Faculty from "../modal/Faculty.js";
import Student from "../modal/Student.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import transporter from "../utils/nodeMail.js";
export const forgotPasswordMail = async (req, res) => {
  dotenv.config();
  try {
    const type = req.body.fUserType;
    const email = req.body.fEmail;

    let user;
    console.log(type);
    if (type == "Faculty") {
      user = await Faculty.findOne({ email });
    } else {
      user = await Student.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { userEmail: user.email, userType: type },
      "myjwtsecret",
      {
        expiresIn: "10m",
      }
    );

    const resetPasswordUrl = `http://localhost:3000/reset-password`;

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Reset your password for E-FYP",
      html: `
            <p>Hi ${user.name},</p>
            <p>Please click on the following link to reset your password:</p>
            <a href="${resetPasswordUrl}">${resetPasswordUrl}</a>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          `,
    });

    res
      .header("authorization", `Bearer ${token}`)
      .status(200)
      .json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  let response;
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token, 62);

    if (!token) {
      return res.sendStatus(401); // Unauthorized
    }

    const email = jwt.verify(token, "myjwtsecret");
    console.log(email);
    if (!email) {
      return res.sendStatus(403); // Forbidden
    }

    const password = req.body.newPass;
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    console.log(password);
    if (email.userType == "Faculty") {
      response = await Faculty.updateOne(
        { email: email.userEmail },
        { password: newPassword }
      );
    } else {
      response = await Student.updateOne(
        { email: email.userEmail },
        { password: newPassword }
      );
    }

    res.json({ res: response, message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
