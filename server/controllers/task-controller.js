import Task from "../modal/Task.js";
import multer from "multer";
import { upload } from "../utils/uploadFile.js";
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
  try {
    const data = await Task.find({ assignedTo: request.body.assignedTo });
    response.status(200).json(data);
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
  try {
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
  try {
    const data = await Task.findOneAndUpdate(
      {
        _id: request.body.id,
      },
      {
        $set: {
          taskStatus: "Pending",
          filespaths: "",
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
