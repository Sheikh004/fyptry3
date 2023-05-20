import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    createdFor: {
      type: Array,
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

const notification = mongoose.model("Notification", NotificationSchema);

export default notification;
