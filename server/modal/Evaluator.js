import mongoose, { Schema } from "mongoose";
const evaluatorSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const evaluator = mongoose.model("evaluator", evaluatorSchema);
export default evaluator;
