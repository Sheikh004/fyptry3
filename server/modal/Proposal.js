import mongoose, { Schema } from "mongoose";
const enumOptions = ["Approved", "Disapproved", "Pending"];
const proposalSchema = new mongoose.Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    supervisorId: {
      type: Schema.Types.ObjectId,
      ref: "Supervisor",
      required: true,
    },

    filepath: {
      type: String,
    },
    status: {
      type: String,
      enum: enumOptions,
      default: "Pending",
    },
    isAssigned: {
      type: Boolean,
      default: false,
    },
    areaOfInterest: [
      {
        type: String,
      },
    ],
    developmentArea: {
      type: String,
    },
    reviewerStatus: {
      type: String,
      enum: enumOptions,
      default: "Pending",
    },
  },

  {
    timestamps: true,
  }
);
const proposal = mongoose.model("proposal", proposalSchema);
export default proposal;
