import Proposal from "../modal/Proposal.js";
import Reviewer from "../modal/Reviewer.js";
import Comment from "../modal/Comments.js";
import Task from "../modal/Task.js";

export const createComment = async (req, res) => {
  const { fid, pid, commentText } = req.body;
  try {
    const proposal = await Proposal.findOne({ _id: pid });
    if (!proposal) {
      return res
        .status(404)
        .json({ error: "No proposal found with the provided ID." });
    }
    const newComment = new Comment({
      proposalId: pid,
      senderId: fid,
      text: commentText,
    });
    await newComment.save();
    return res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const createTaskComment = async (req, res) => {
  const { fid, pid, commentText } = req.body;
  try {
    const task = await Task.findOne({ _id: pid });
    if (!task) {
      return res
        .status(404)
        .json({ error: "No task found with the provided ID." });
    }
    const newComment = new Comment({
      proposalId: pid,
      senderId: fid,
      text: commentText,
    });
    await newComment.save();
    return res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getComments = async (req, res) => {
  const { pid, fid } = req.params;
  try {
    const senderFirstComment = await Comment.findOne({
      proposalId: pid,
      senderId: fid,
    }).sort({ createdAt: 1 });
    if (!senderFirstComment) {
      return res.status(200).json([]);
    }
    const comments = await Comment.find({
      proposalId: pid,
      senderId: fid,
      createdAt: { $gte: senderFirstComment.createdAt },
    });
    return res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteComment = async (req, res) => {
  const { cid } = req.params;
  try {
    const deleted = await Comment.deleteOne({ _id: cid });
    return res.status(200).json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getGroupComments = async (req, res) => {
  const { pid } = req.params;
  try {
    const groupComments = await Comment.find({ proposalId: pid });
    return res.status(200).json(groupComments);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
