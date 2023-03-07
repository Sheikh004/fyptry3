import Evaluator from "../modal/Evaluator.js";
import Student from "../modal/Student.js";
import Supervisor from "../modal/Supervisor.js";
import Reviewer from "../modal/Reviewer.js";

export const getUser = async (request, response) => {
  try {
    if (request.body.type == "Student") {
      const user = await Student.findOne({ email: request.body.email });
      console.log(user);
      if (!user) {
        console.log("No such user");
      }
      return response.status(200).json(user);
    } else if (request.body.type == "Supervisor") {
      const user = await Supervisor.findOne({ email: request.body.email });
      if (!user) {
        console.log("No such user");
      }
      return response.status(200).json(user);
    } else if (request.body.type == "Evaluator") {
      const user = await Evaluator.findOne({ email: request.body.email });
      if (!user) {
        console.log("No such user");
      }
      return response.status(200).json(user);
    } else if (request.body.type == "Reviewer") {
      const user = await Reviewer.findOne({ email: request.body.email });
      if (!user) {
        console.log("No such user");
      }
      return response.status(200).json(user);
    }
  } catch (error) {
    return response.status(500).json(error);
  }
};
