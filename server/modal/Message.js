import mongoose, { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: Array,
      required: true,
    },
    text: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const message = mongoose.model("Message", MessageSchema);

export default message;
