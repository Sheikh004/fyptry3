import mongoose, { Schema } from "mongoose";
const reviewerSchema = new mongoose.Schema(
  {
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    proposalList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Proposal",
      },
    ],
    role: {
      type: String,
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
const reviewer = mongoose.model("reviewer", reviewerSchema);
export default reviewer;
