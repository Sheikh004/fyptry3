import mongoose, { Schema } from "mongoose";
const supervisorSchema = new mongoose.Schema(
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

const supervisor = mongoose.model("supervisor", supervisorSchema);
export default supervisor;
