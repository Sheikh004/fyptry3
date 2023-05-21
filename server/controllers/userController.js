import Evaluator from "../modal/Evaluator.js";
import Student from "../modal/Student.js";
import Supervisor from "../modal/Supervisor.js";
import Reviewer from "../modal/Reviewer.js";
import Faculty from "../modal/Faculty.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import FYPCommittee from "../modal/FYPCommittee.js";
import Group from "../modal/Group.js";
import message from "../modal/Message.js";

export const getUser = async (request, response) => {
  let passFlag;
  const options = {
    expiresIn: "1h",
  };
  try {
    if (request.body.type == "Student") {
      const user = await Student.findOne({ email: request.body.email });

      if (!user) {
        console.log("No such user");
        return response.status(550).json({ message: "No such user exists" });
      } else {
        const userGroupExist = await Group.findOne({ studentID: user._id });
        if (!userGroupExist)
          return response
            .status(550)
            .json({ message: "Student is not registered in any group" });
        let email = request.body.email;
        let password = request.body.password;
        // bcrypt.compare(password, user.password, (err, result) => {
        //   if (err) {
        //     console.log("error in encrypt password comparing", err);
        //     return;
        //   } else if (result == true) {
        //     const token = jwt.sign({ email: email }, "myjwtsecret", options);

        //     response.header("Access-Control-Expose-Headers", "Authorization");
        //     // console.log(user.name);
        //     return response
        //       .header("authorization", `Bearer ${token}`)
        //       .status(200)
        //       .send({
        //         id: user._id,
        //         name: user.name,
        //         email: user.email,
        //         type: request.body.type,
        //       });
        //   } else {
        //     console.log("Incorrect password");
        //     return response.status(401).json({ message: "Incorrect password" });
        //   }
        // }); commenting for bypassing purposes.

        //remove this code and uncomment above code later on
        if (password == user.password) {
          const token = jwt.sign({ email: email }, "myjwtsecret", options);

          response.header("Access-Control-Expose-Headers", "Authorization");
          // console.log(user.name);
          return response
            .header("authorization", `Bearer ${token}`)
            .status(200)
            .send({
              id: user._id,
              name: user.name,
              email: user.email,
              type: request.body.type,
              groupId: userGroupExist._id,
            });
        } else {
          console.log("Incorrect password");
          return response.status(401).json({ message: "Incorrect password" });
        }
        //remove this code and uncomment above code later on
      }
    } else if (request.body.type == "Supervisor") {
      const user = await Faculty.findOne({ email: request.body.email });
      if (!user) {
        console.log("No such user");
        return response.status(550).json({ message: "No such user exists" });
      } else {
        let email = request.body.email;
        let password = request.body.password;
        // bcrypt.compare(password, user.password, (err, result) => {
        //   if (err) {
        //     console.log("Error in encrypted password compare", err);
        //     return;
        //   } else if (result == true) {
        //     passFlag = true;
        //   } else {
        //     passFlag = false;
        //     return response.status(401).json({ message: "Incorrect password" });
        //   }
        // }); commenting for bypassing purposes.

        //remove this code and uncomment above code later on
        if (password == user.password) {
          passFlag = true;
        } else {
          passFlag = false;
          return response.status(401).json({ message: "Incorrect password" });
        } //remove this code and uncomment above code later on
        if (passFlag == true) {
          const userType = await Supervisor.findOne({ email: email });
          if (!userType) {
            console.log("User is not registered as Supervisor");
            return response
              .status(401)
              .json({ message: "User is not registered as Supervisor" });
          } else {
            const token = jwt.sign({ email: email }, "myjwtsecret", options);

            response.header("Access-Control-Expose-Headers", "Authorization");

            return response
              .header("authorization", `Bearer ${token}`)
              .status(200)
              .send({
                id: userType._id,
                name: userType.name,
                email: userType.email,
                type: request.body.type,
              });
          }
        }
      }
    } else if (request.body.type == "Evaluator") {
      const user = await Faculty.findOne({ email: request.body.email });
      if (!user) {
        console.log("No such user");
        return response.status(550).json({ message: "No such user exists" });
      } else {
        let email = request.body.email;
        let password = request.body.password;
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.log("Error in encrypted password compare", err);
            return;
          } else if (result == true) {
            passFlag = true;
          } else {
            passFlag = false;
            return response.status(401).json({ message: "Incorrect password" });
          }
        });
        if (passFlag == true) {
          const userType = await Evaluator.findOne({ email: email });
          if (!userType) {
            console.log("User is not registered as Evaluator");
            return response
              .status(401)
              .json({ message: "User is not registered as Evaluator" });
          } else {
            const token = jwt.sign({ email: email }, "myjwtsecret", options);

            response.header("Access-Control-Expose-Headers", "Authorization");

            return response
              .header("authorization", `Bearer ${token}`)
              .status(200)
              .send({
                id: userType._id,
                name: userType.name,
                email: userType.email,
                type: request.body.type,
              });
          }
        }
      }
    } else if (request.body.type == "FYPCommittee") {
      const user = await Faculty.findOne({ email: request.body.email });
      if (!user) {
        console.log("No such user");
        return response.status(550).json({ message: "No such user exists" });
      } else {
        let email = request.body.email;
        let password = request.body.password;
        // bcrypt.compare(password, user.password, (err, result) => {
        //   if (err) {
        //     console.log("Error in encrypted password compare", err);
        //     return;
        //   } else if (result == true) {
        //     passFlag = true;
        //   } else {
        //     passFlag = false;
        //     return response.status(401).json({ message: "Incorrect password" });
        //   }
        // });  commenting for bypassing purposes.
        //remove this code and uncomment above code later on
        if (password == user.password) {
          passFlag = true;
        } else {
          passFlag = false;
          return response.status(401).json({ message: "Incorrect password" });
        } //remove this code and uncomment above code later on
        if (passFlag == true) {
          const userType = await FYPCommittee.findOne({ email: email });
          if (!userType) {
            console.log("User is not registered as FYPCommittee");
            return response
              .status(401)
              .json({ message: "User is not registered as FYPCommittee" });
          } else {
            const token = jwt.sign({ email: email }, "myjwtsecret", options);

            response.header("Access-Control-Expose-Headers", "Authorization");

            return response
              .header("authorization", `Bearer ${token}`)
              .status(200)
              .send({
                id: userType._id,
                name: userType.name,
                email: userType.email,
                type: request.body.type,
              });
          }
        }
      }
    } else if (request.body.type == "Reviewer") {
      const user = await Faculty.findOne({ email: request.body.email });
      if (!user) {
        console.log("No such user");
        return response.status(550).json({ message: "No such user exists" });
      } else {
        let email = request.body.email;
        let password = request.body.password;
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.log("Error in encrypted password compare", err);
            return;
          } else if (result == true) {
            passFlag = true;
          } else {
            passFlag = false;
            return response.status(401).json({ message: "Incorrect password" });
          }
        });
        if (passFlag == true) {
          const userType = await Reviewer.findOne({ email: email });
          if (!userType) {
            console.log("User is not registered as Reviewer");
            return response
              .status(401)
              .json({ message: "User is not registered as Reviewer" });
          } else {
            const token = jwt.sign({ email: email }, "myjwtsecret", options);

            response.header("Access-Control-Expose-Headers", "Authorization");

            return response
              .header("authorization", `Bearer ${token}`)
              .status(200)
              .send({
                id: userType._id,
                name: userType.name,
                email: userType.email,
                type: request.body.type,
              });
          }
        }
      }
    }
  } catch (error) {
    return response.status(500).json(error);
  }
};

export const getChatters = async (req, res) => {
  try {
    // const user = await Student.findOne({ email: request.body.email });
    // const user2 = new Group({
    //   studentID: ["6418d73767d4f1700d443f24"],
    //   supervisorId: "641800d14c144769799107e6",
    // });
    // user2.save();
    // return response.send({ user2 });
    // const user = await Faculty.findOne({
    //   email: "humairaafzal@cuilahore.edu.pk",
    // });
    // const supervisor = new Supervisor({
    //   email: user.email,
    //   facultyId: user._id,
    //   name: user.name,
    //   email: user.email,
    //   groupCount: 0,
    // });
    // supervisor.save();
    const user = await Group.find({ supervisorId: req.body.supId }).populate([
      {
        path: "studentID",
        model: Student,
        select: "name email",
      },
      {
        path: "supervisorId",
        model: Supervisor,
        select: "name",
      },
      {
        path: "evaluatorID",
        model: Evaluator,
        select: "name",
      },
    ]);

    return res.send({ user });
  } catch (error) {
    console.log(error);
  }
};

export const getStChatters = async (req, res) => {
  try {
    const user = await Group.find({ studentID: req.body.stId }).populate([
      {
        path: "studentID",
        model: Student,
        select: "name",
      },
      {
        path: "supervisorId",
        model: Supervisor,
        select: "name",
      },
      {
        path: "evaluatorID",
        model: Evaluator,
        select: "name",
      },
    ]);
    return res.send({ user });
  } catch (error) {
    console.log(error);
  }
};

export const registerSupervisor = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const data = await Faculty.findOne({ email: email });
    if (!data) {
      return res.status(404).json({ message: "No such faculty member exists" });
    }
    // bcrypt.compare(password, data.password, async (err, result) => {
    //   if (err) {
    //     console.log("error in encrypt password comparing", err);
    //     return;
    //   } else if (result == true) {
    //     const supervisorExist = await Supervisor.findOne({
    //       facultyId: data._id,
    //     });
    //     if (supervisorExist) {
    //       return res
    //         .status(403)
    //         .json({ message: "Supervisor is already registered" });
    //     }
    //     const newSupervisor = new Supervisor({
    //       facultyId: data._id,
    //     });
    //     await newSupervisor.save();
    //     res.status(200).json({ message: "Supervisor registered successfully" });
    //   } else {
    //     console.log("Incorrect password");
    //     return res.status(401).json({ message: "Incorrect password" });
    //   }
    // }); //commenting for bypassing purposes.

    //remove this code and uncomment above code later on
    if (password === data.password) {
      const supervisorExist = await Supervisor.findOne({ facultyId: data._id });
      if (supervisorExist) {
        return res
          .status(403)
          .json({ message: "Supervisor is already registered" });
      }
      const newSupervisor = new Supervisor({
        facultyId: data._id,
        email: data.email,
      });
      await newSupervisor.save();
      return res
        .status(200)
        .json({ message: "Supervisor registered successfully" });
    } else {
      console.log("Incorrect password");
      return res.status(401).json({ message: "Incorrect password" });
    }
    //remove this code and uncomment above code later on
  } catch (error) {
    console.error("An error occurred during supervisor registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
