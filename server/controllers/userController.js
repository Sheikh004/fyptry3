import Evaluator from "../modal/Evaluator.js";
import Student from "../modal/Student.js";
import Supervisor from "../modal/Supervisor.js";
import Reviewer from "../modal/Reviewer.js";
import jwt from "jsonwebtoken";
export const getUser = async (request, response) => {
  const options = {
    expiresIn: "1h",
  };
  try {
    if (request.body.type == "Student") {
      const user = await Student.findOne({ email: request.body.email });

      if (!user) {
        console.log("No such user");
        return;
      } else {
        let email = request.body.email;
        let password = request.body.password;

        if (user.password == password) {
          const token = jwt.sign({ email: email }, "myjwtsecret", options);

          response.header("Access-Control-Expose-Headers", "Authorization");

          return response.header("Authorization", token).status(200).send({
            user,
          });
        } else {
          console.log("Incorrect password");
          return;
        }
      }
    } else if (request.body.type == "Supervisor") {
      const user = await Supervisor.findOne({ email: request.body.email });
      if (!user) {
        console.log("No such user");
        return;
      } else {
        let email = request.body.email;
        let password = request.body.password;

        if (user.password == password) {
          const token = jwt.sign({ email: email }, "myjwtsecret", options);

          response.header("Access-Control-Expose-Headers", "Authorization");

          return response.header("Authorization", token).status(200).send({
            user,
          });
        } else {
          console.log("Incorrect password");
          return;
        }
      }
    } else if (request.body.type == "Evaluator") {
      const user = await Evaluator.findOne({ email: request.body.email });
      if (!user) {
        console.log("No such user");
        return;
      } else {
        let email = request.body.email;
        let password = request.body.password;

        if (user.password == password) {
          const token = jwt.sign({ email: email }, "myjwtsecret", options);

          response.header("Access-Control-Expose-Headers", "Authorization");

          return response.header("Authorization", token).status(200).send({
            user,
          });
        } else {
          console.log("Incorrect password");
          return;
        }
      }
    } else if (request.body.type == "Reviewer") {
      const user = await Reviewer.findOne({ email: request.body.email });
      if (!user) {
        console.log("No such user");
        return;
      } else {
        let email = request.body.email;
        let password = request.body.password;

        if (user.password == password) {
          const token = jwt.sign({ email: email }, "myjwtsecret", options);

          response.header("Access-Control-Expose-Headers", "Authorization");

          return response.header("Authorization", token).status(200).send({
            user,
          });
        } else {
          console.log("Incorrect password");
          return;
        }
      }
    }
  } catch (error) {
    return response.status(500).json(error);
  }
};
