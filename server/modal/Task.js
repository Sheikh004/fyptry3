import mongoose, { Schema } from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    deadline: {
      type: Date,
      required: true,
    },
    taskStatus: {
      type: String,
      required: true,
    },
    taskApproval: {
      type: String,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "Supervisor",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    filespaths: [
      {
        type: String,
      },
    ],
  },

  {
    timestamps: true,
  }
);
const task = mongoose.model("task", taskSchema);
export default task;
