import mongoose, { Mongoose, Schema } from "mongoose";
const facultySchema = new mongoose.Schema(
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
    title: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    areaOfInterest: [
      {
        type: String,
      },
    ],
    developmentField: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const faculty = mongoose.model("faculty", facultySchema);
export default faculty;
