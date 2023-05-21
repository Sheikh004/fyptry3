import mongoose, { Schema } from "mongoose";
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
    developmentField: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);
const proposal = mongoose.model("proposal", proposalSchema);
export default proposal;
