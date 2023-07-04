import mongoose from "mongoose";
const enumOptions = ["FYP_Announcements", "Proposal", "Task", "Chat"];
const NotificationSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
    },
    createdFor: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
    notifType: {
      type: String,
      enum: enumOptions,
    },
  },
  {
    timestamps: true,
  }
);

const notification = mongoose.model("Notification", NotificationSchema);

export default notification;
