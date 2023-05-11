import Student from "../modal/Student.js";
import Group from "../modal/Group.js";

import Supervisor from "../modal/Supervisor.js";
export const getGroupMembers = async (req, res) => {
  const students = req.body.groupMembers;
  let groupmemberIds = [];
  for (let student of students) {
    let user = await Student.findOne({ email: student });
    if (!user)
      return res.status(550).json({ message: "No such student exists" });
    if (user.department != "CS")
      return res
        .status(550)
        .json({ message: "Student is not from CS department" });

    let studentReg = await Group.findOne({ studentID: user._id });
    if (studentReg) {
      return res
        .status(403)
        .json({ message: "Student(s) already registered in a group" });
    }
    groupmemberIds.push(user._id);
  }

  const supervisor = await Supervisor.findOne({
    _id: req.body.supId,
  });
  if (!supervisor)
    return res.status(550).json({ message: "No such supervisor exists" });
  const supervisorGroups = await Group.find({ supervisorId: req.body.supId });

  if (supervisorGroups.length >= 3)
    return res
      .status(403)
      .json({ message: "Supervisor has already registered 3 groups" });
  const group = req.body.groupName;
  const groupName = await Group.findOne({ name: group });
  if (groupName)
    return res.status(403).json({ message: "Group name already exists" });

  const newGroup = new Group({
    name: req.body.groupName,
    studentID: groupmemberIds,
    supervisorId: req.body.supId,
    groupLeader: req.body.groupLeader,
  });
  await newGroup.save();
  return res.status(200).json({ message: "Group registered successfully" });
};

export const getSupervisorGroups = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.find({ supervisorId: id });

    return res.send({ group });
  } catch (error) {
    console.log(error);
  }
};

export const getGroupLeader = async (req, res) => {
  const { id } = req.params;
  Group.findOne({ studentID: id })
    .select("groupLeader")
    .exec((err, groupLeader) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(groupLeader);
      }
    });
};

export const getGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findOne({ studentID: id });
    res.send(group);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
