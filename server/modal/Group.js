import mongoose, { Schema } from "mongoose";
const enumOptions = ["Approved", "Disapproved", "Pending"];
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
      ref: "Student",
      required: true,
    },
    supervisorId: {
      type: Schema.Types.ObjectId,
      ref: "Supervisor",
      required: true,
    },
    // evaluatorID: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Evaluator",
    // },
    isAssignedOne: {
      type: Boolean,
      default: false,
    },
    isApprovedOne: {
      type: String,
      enum: enumOptions,
      default: "Pending",
    },
    isAssignedPre: {
      type: Boolean,
      default: false,
    },
    isApprovedPre: {
      type: String,
      enum: enumOptions,
      default: "Pending",
    },
    isAssignedTwo: {
      type: Boolean,
      default: false,
    },
    isApprovedTwo: {
      type: String,
      enum: enumOptions,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const group = mongoose.model("group", groupSchema);
export default group;
