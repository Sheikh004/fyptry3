import mongoose, { Schema } from "mongoose";
const supervisorSchema = new mongoose.Schema(
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

const supervisor = mongoose.model("supervisor", supervisorSchema);
export default supervisor;
