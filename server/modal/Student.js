import mongoose, { Schema } from "mongoose";
const studentSchema = new mongoose.Schema(
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
    cgpa: {
      type: Number,
    },
    department: {
      type: String,
    },

    groupID: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  },
  {
    timestamps: true,
  }
);

const student = mongoose.model("student", studentSchema);

export default student;
