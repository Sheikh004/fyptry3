import mongoose, { Schema } from "mongoose";
const preEvaluatorSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    groupList: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Group",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const preEvaluator = mongoose.model("preEvaluator", preEvaluatorSchema);
export default preEvaluator;
