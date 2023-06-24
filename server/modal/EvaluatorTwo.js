import mongoose, { Schema } from "mongoose";
const evaluatorTwoSchema = new mongoose.Schema(
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

const evaluatorTwo = mongoose.model("evaluatorTwo", evaluatorTwoSchema);
export default evaluatorTwo;
