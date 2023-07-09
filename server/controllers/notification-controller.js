import Notification from "../modal/Notification.js";
import Student from "../modal/Student.js";
import Faculty from "../modal/Faculty.js";

export const createNotification = async (req, res) => {
  try {
    const notification = new Notification({
      text: req.body.notification,
      createdBy: req.body.createdBy,
      createdFor: req.body.createdFor,
      notifType: req.body.notifType,
    });
    await notification.save();
    return res.status(200).json(notification);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const createNotificationBroadcast = async (req, res) => {
  try {
    // Get all users
    const students = await Student.find();
    const faculty = await Faculty.find({ activeStatus: true });
    const userList = [...students, ...faculty];
    // Create separate notifications for each user
    const notifications = userList.map((user) => ({
      text: req.body.notification,
      createdFor: user._id,
      notifType: req.body.notifType,
    }));
    // Save all notifications
    const savedNotifications = await Notification.insertMany(notifications);
    res.status(200).json(savedNotifications);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getNotifications = async (req, res) => {
  try {
    const not = await Notification.find({ createdFor: req.body.cFor });
    res.status(200).json(not);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
