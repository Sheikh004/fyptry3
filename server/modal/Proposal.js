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
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const proposal = mongoose.model("proposal", proposalSchema);
export default proposal;
