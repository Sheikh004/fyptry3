import Notification from "../modal/Notification.js";
export const createNotification = async (req, res) => {
  try {
    const notification = new Notification({
      text: req.body.notification,
      createdBy: req.body.createdBy,
      createdFor: req.body.createdFor,
    });
    await notification.save();
    return res.send({ notification });
  } catch (err) {
    res.send(err);
  }
};
