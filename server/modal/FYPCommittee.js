import mongoose, { Schema } from "mongoose";
const fypcommitteeSchema = new mongoose.Schema(
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

const fypcommittee = mongoose.model("fypcommittee", fypcommitteeSchema);
export default fypcommittee;
