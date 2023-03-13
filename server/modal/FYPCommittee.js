import mongoose from "mongoose";
const fypcommitteeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
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
