import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    proposalId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },

    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const comment = mongoose.model("Comment", CommentSchema);

export default comment;
