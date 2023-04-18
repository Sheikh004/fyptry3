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
  },
  {
    timestamps: true,
  }
);
const reviewer = mongoose.model("reviewer", reviewerSchema);
export default reviewer;
