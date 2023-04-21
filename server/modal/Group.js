import mongoose, { Schema } from "mongoose";
const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    studentID: [
      { type: Schema.Types.ObjectId, ref: "Student", required: true },
    ],
    groupLeader: {
      type: String,
      required: true,
    },
    supervisorId: {
      type: Schema.Types.ObjectId,
      ref: "Supervisor",
      required: true,
    },
    evaluatorID: {
      type: Schema.Types.ObjectId,
      ref: "Evaluator",
    },
  },
  {
    timestamps: true,
  }
);

const group = mongoose.model("group", groupSchema);
export default group;
