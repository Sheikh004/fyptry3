import Task from "../modal/Task.js";
import Group from "../modal/Group.js";
import fs from "fs";
export const assignTask = async (request, response) => {
  const title = request.body.title;
  const description = request.body.description;
  const dueDate = request.body.dueDate;
  const assignedBy = request.body.assignedBy;
  const assignedTo = request.body.assignedTo;
  try {
    const task = await new Task({
      title: title,
      description: description,
      deadline: dueDate,
      assignedBy: assignedBy,
      assignedTo: assignedTo,
      taskStatus: "Pending",
      taskApproval: "Pending",
    });
    await task.save();
    response.send(task);
  } catch (error) {
    console.log(error);
    response.send(error);
  }
};

export const getTasks = async (request, response) => {
  try {
    const data = await Task.find({
      $and: [
        { assignedBy: request.body.assignedBy },
        { assignedTo: request.body.assignedTo },
      ],
    });
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
    response.send(error);
  }
};

export const fetchTasks = async (request, response) => {
  let supervisorsId;
  try {
    await Group.findOne({
      _id: request.body.groupId,
    })
      .select("supervisorId")

      .exec(async (err, user) => {
        if (err) {
          console.error(err);
          response.send({ message: "Error while fetching supervisorId" });
        } else {
          const data = await Task.find({
            $and: [
              { assignedBy: user.supervisorId },
              { assignedTo: request.body.assignedTo },
            ],
          });
          console.log(data);
          response.status(200).json(data);
        }
      });
  } catch (error) {
    console.log(error);
    response.send(error);
  }
};

export const handleUploadTasks = async (request, response) => {
  const url = "http://localhost:8000";
  if (!request.files || request.files.length === 0) {
    return response.status(404).json("Files not found");
  }

  const fileUrls = [];
  for (const file of request.files) {
    let dir;
    if (file.mimetype.startsWith("image")) dir = `/images`;
    else dir = `/files`;
    const fileUrl = `${url}/${dir}/${file.filename}`;
    fileUrls.push(fileUrl);
  }
  response.send(fileUrls);
};

export const updateTask = async (request, response) => {
  function removeFiles(fileNames) {
    fileNames.forEach((fileName) => {
      if (
        fileName.split(".").pop() === "jpeg" ||
        fileName.split(".").pop() === "png" ||
        fileName.split(".").pop() === "jpg"
      ) {
        fs.unlink(`./uploads/images/${fileName.split("/").pop()}`, (err) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log(`${fileName} has been removed from the server.`);
        });
      } else {
        fs.unlink(`./uploads/files/${fileName.split("/").pop()}`, (err) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log(`${fileName} has been removed from the server.`);
        });
      }
    });
  }
  try {
    const checkData = await Task.findOne({ _id: request.body.id });
    if (checkData && checkData.filespaths.length !== 0) {
      removeFiles(checkData.filespaths);
    }
    const data = await Task.findOneAndUpdate(
      {
        _id: request.body.id,
      },
      {
        $set: {
          filespaths: request.body.filesNameArr,
        },
      },
      { returnOriginal: false }
    );
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
    response.send(error);
  }
};

export const setPendingTask = async (request, response) => {
  // function removeFiles(fileNames) {
  //   fileNames.forEach((fileName) => {
  //     if (
  //       fileName.split(".").pop() === "jpeg" ||
  //       fileName.split(".").pop() === "png" ||
  //       fileName.split(".").pop() === "jpg"
  //     ) {
  //       fs.unlink(`./uploads/images/${fileName.split("/").pop()}`, (err) => {
  //         if (err) {
  //           console.error(err);
  //           return;
  //         }

  //         console.log(`${fileName} has been removed from the server.`);
  //       });
  //     } else {
  //       fs.unlink(`./uploads/files/${fileName.split("/").pop()}`, (err) => {
  //         if (err) {
  //           console.error(err);
  //           return;
  //         }

  //         console.log(`${fileName} has been removed from the server.`);
  //       });
  //     }
  //   });
  // }
  try {
    const filepaths = await Task.findOne({ _id: request.body.id });
    // removeFiles(filepaths.filespaths);
    const data = await Task.findOneAndUpdate(
      {
        _id: request.body.id,
      },
      {
        $set: {
          taskStatus: "Pending",
          taskApproval: "Pending",
        },
      },
      { returnOriginal: false }
    );
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
    response.send(error);
  }
};

export const removeFile = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  console.log(id);
  function removeSingleFile(fileName) {
    if (
      fileName.split(".").pop() === "jpeg" ||
      fileName.split(".").pop() === "png" ||
      fileName.split(".").pop() === "jpg"
    ) {
      fs.unlink(`./uploads/images/${fileName.split("/").pop()}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`${fileName} has been removed from the server.`);
      });
    } else {
      fs.unlink(`./uploads/files/${fileName.split("/").pop()}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`${fileName} has been removed from the server.`);
      });
    }
  }

  try {
    const task = await Task.findOne({ _id: id });
    if (task) {
      const updatedfilePaths = task.filespaths.filter((fileName) => {
        if (fileName !== name) return fileName;
      });
      removeSingleFile(name);
      const updatedTask = await Task.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            filespaths: updatedfilePaths,
          },
        },
        {
          returnOriginal: false,
        }
      );
      res.status(200).json(updatedTask);
    }
  } catch (err) {
    res.send(err);
  }
};

export const setCompletedTask = async (request, response) => {
  try {
    const data = await Task.findOneAndUpdate(
      {
        _id: request.body.id,
      },
      {
        $set: {
          taskStatus: "Completed",
        },
      },
      { returnOriginal: false }
    );
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
    response.send(error);
  }
};

export const updateTaskApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const value = req.body.taskValue;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          taskApproval: value,
        },
      },
      { returnOriginal: false }
    );

    if (updatedTask) {
      return res
        .status(200)
        .json({ message: "Task status has been updated", data: updatedTask });
    } else console.log("Issue");
  } catch (error) {
    console.error("An error occurred during task approval update:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
