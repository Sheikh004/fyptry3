import mongoose, { Schema } from "mongoose";
const fypcommitteeSchema = new mongoose.Schema(
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

    department: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const fypcommittee = mongoose.model("fypcommittee", fypcommitteeSchema);
export default fypcommittee;
