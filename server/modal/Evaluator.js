import mongoose, { Schema } from "mongoose";
const evaluatorSchema = new mongoose.Schema(
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

const evaluator = mongoose.model("evaluator", evaluatorSchema);
export default evaluator;

// groupList: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: "Group",
//   },
// ],
