import mongoose, { Schema } from "mongoose";
const reviewerSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },

    proposalList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Proposal",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const reviewer = mongoose.model("reviewer", reviewerSchema);
export default reviewer;
