import mongoose, { Schema } from "mongoose";
const gradeSchema = new mongoose.Schema(
  {
    studentID: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    eGradeOne: {
      type: Number,
    },
    eGradeTwo: {
      type: Number,
    },
    sGradeOne: {
      type: Number,
    },
    sGradeTwo: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const grade = mongoose.model("grade", gradeSchema);
export default grade;
