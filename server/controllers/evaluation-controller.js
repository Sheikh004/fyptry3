import Faculty from "../modal/Faculty.js";
import Evaluator from "../modal/Evaluator.js";
import Group from "../modal/Group.js";
import Proposal from "../modal/Proposal.js";
import EvaluatorTwo from "../modal/EvaluatorTwo.js";
import PreEvaluator from "../modal/PreEvaluator.js";
import Supervisor from "../modal/Supervisor.js";
import Student from "../modal/Student.js";

export const assignEvaluatorsForFypOne = async (req, res) => {
  const proposals = await Proposal.find({
    reviewerStatus: "Approved",
  });
  const groups = await Group.find({ isAssignedOne: false }, { _id: 1 });
  const faculty = await Faculty.find({ activeStatus: true });
  const groupArr = [];
  groups.map((group) => groupArr.push(group._id.toString()));
  const filteredGroups = [];
  proposals.forEach((proposal) => {
    if (groupArr.includes(proposal.groupId.toString()))
      filteredGroups.push({
        groupID: proposal.groupId.toString(),
        gDevelopmentArea: proposal.developmentArea,
        gAreaOfInterest: proposal.areaOfInterest,
        gSupervisorId: proposal.supervisorId.toString(),
        proposalPath: proposal.filepath,
      });
  });

  // console.log(filteredGroups);
  const evaluatorList = await Evaluator.find({}, { _id: 1 });

  const evaluators = [];

  evaluatorList.map((evaluator) => evaluators.push(evaluator._id.toString()));

  const filteredFaculty = faculty.filter((member) => {
    if (!evaluators.includes(member._id.toString())) return member;
  });

  await Promise.all(
    filteredFaculty.map(async (faculty) => {
      let addEvaluator = new Evaluator({
        _id: faculty._id,
      });
      await addEvaluator.save();
      return addEvaluator;
    })
  );
  // console.log(result);
  // if (result) {
  const aggregatedEvaluator = await Evaluator.aggregate([
    {
      $addFields: {
        groupNo: { $size: "$groupList" },
      },
    },
    {
      $sort: { groupNo: 1 },
    },
    {
      $lookup: {
        from: "faculties", // Name of the referenced collection
        localField: "_id",
        foreignField: "_id",
        as: "populatedFaculty",
      },
    },
  ]);
  // console.log(aggregatedEvaluator);
  const lecturers = aggregatedEvaluator.filter((evaluator) => {
    if (
      evaluator.populatedFaculty[0].title == "Lecturer" &&
      evaluator.populatedFaculty[0].role !== "HOD" &&
      evaluator.populatedFaculty[0].role !== "DCO"
    )
      //   console.log(evaluator.proposalNo);
      // evaluator.proposalNo += 1;
      return evaluator;
  });
  // console.log(lecturers);
  const assistantProfessors = aggregatedEvaluator.filter((evaluator) => {
    if (
      evaluator.populatedFaculty[0].title == "Assistant Professor" &&
      evaluator.populatedFaculty[0].role !== "HOD" &&
      evaluator.populatedFaculty[0].role !== "DCO"
    )
      return evaluator;
  });

  const pHDAssistantProfessors = aggregatedEvaluator.filter((evaluator) => {
    if (
      evaluator.populatedFaculty[0].title == "PHD Assistant Professor" &&
      evaluator.populatedFaculty[0].role !== "HOD" &&
      evaluator.populatedFaculty[0].role !== "DCO"
    )
      return evaluator;
  });
  const associateProfessors = aggregatedEvaluator.filter((evaluator) => {
    if (
      evaluator.populatedFaculty[0].title == "Associate Professor" &&
      evaluator.populatedFaculty[0].role !== "HOD" &&
      evaluator.populatedFaculty[0].role !== "DCO"
    )
      return evaluator;
  });
  const allEvaluators = [
    ...lecturers,
    ...assistantProfessors,
    ...pHDAssistantProfessors,
    ...associateProfessors,
  ];
  // console.log(allEvaluators);
  const data = await Promise.all(
    filteredGroups.map(async (group) => {
      // console.log(group);
      allEvaluators.sort((a, b) => a.groupNo - b.groupNo);
      // console.log(allEvaluators);
      for (let i = 0; i < allEvaluators.length; i++) {
        // console.log(group);
        // console.log(allEvaluators[i].populatedFaculty[0].developmentField);
        if (
          allEvaluators.length != 0 &&
          allEvaluators[i]._id.toString() !== group.gSupervisorId &&
          group.gDevelopmentArea.some((field) =>
            allEvaluators[i].populatedFaculty[0].developmentField.includes(
              field
            )
          )
          // allEvaluators[i].populatedFaculty[0].developmentField.includes(
          //   group.gDevelopmentArea
          // )
        ) {
          if (
            group.gAreaOfInterest.some((interest) =>
              allEvaluators[i].populatedFaculty[0].areaOfInterest.includes(
                interest
              )
            )
          ) {
            console.log(group);
            let arr = allEvaluators[i].groupList;
            arr.push(group.groupID);
            console.log(arr);

            let data2 = await Group.findOneAndUpdate(
              { _id: group.groupID },
              {
                $set: {
                  isAssignedOne: true,
                },
              },
              { returnOriginal: false }
            );

            let data3 = await Evaluator.findOneAndUpdate(
              {
                _id: allEvaluators[i].populatedFaculty[0]._id,
              },
              {
                $set: { groupList: arr },
              },
              { returnOriginal: false }
            );
            allEvaluators[i].groupNo += 1;
            return { proposal: data2, evaluator: data3 };
          }
        }
      }
    })
  );
  // console.log(data);
  // }
};

export const assignEvaluatorsForPreFyp = async (req, res) => {
  const proposals = await Proposal.find({
    reviewerStatus: "Approved",
  });
  const groups = await Group.find(
    { $and: [{ isAssignedPre: false }, { isApprovedOne: "Approved" }] },
    { _id: 1 }
  );
  const faculty = await Faculty.find({ activeStatus: true });
  const groupArr = [];
  groups.map((group) => groupArr.push(group._id.toString()));
  const filteredGroups = [];
  proposals.forEach((proposal) => {
    if (groupArr.includes(proposal.groupId.toString()))
      filteredGroups.push({
        groupID: proposal.groupId.toString(),
        gDevelopmentArea: proposal.developmentArea,
        gAreaOfInterest: proposal.areaOfInterest,
        gSupervisorId: proposal.supervisorId.toString(),
        proposalPath: proposal.filepath,
      });
  });

  // console.log(filteredGroups);
  const evaluatorList = await PreEvaluator.find({}, { _id: 1 });

  const evaluators = [];

  evaluatorList.map((evaluator) => evaluators.push(evaluator._id.toString()));

  const filteredFaculty = faculty.filter((member) => {
    if (!evaluators.includes(member._id.toString())) return member;
  });

  await Promise.all(
    filteredFaculty.map(async (faculty) => {
      let addEvaluator = new PreEvaluator({
        _id: faculty._id,
      });
      await addEvaluator.save();
      return addEvaluator;
    })
  );
  // console.log(result);
  // if (result) {
  const aggregatedEvaluator = await PreEvaluator.aggregate([
    {
      $addFields: {
        groupNo: { $size: "$groupList" },
      },
    },
    {
      $sort: { groupNo: 1 },
    },
    {
      $lookup: {
        from: "faculties", // Name of the referenced collection
        localField: "_id",
        foreignField: "_id",
        as: "populatedFaculty",
      },
    },
  ]);
  // console.log(aggregatedEvaluator);
  const lecturers = aggregatedEvaluator.filter((evaluator) => {
    if (
      evaluator.populatedFaculty[0].title == "Lecturer" &&
      evaluator.populatedFaculty[0].role !== "HOD" &&
      evaluator.populatedFaculty[0].role !== "DCO"
    )
      //   console.log(evaluator.proposalNo);
      // evaluator.proposalNo += 1;
      return evaluator;
  });
  // console.log(lecturers);
  const assistantProfessors = aggregatedEvaluator.filter((evaluator) => {
    if (
      evaluator.populatedFaculty[0].title == "Assistant Professor" &&
      evaluator.populatedFaculty[0].role !== "HOD" &&
      evaluator.populatedFaculty[0].role !== "DCO"
    )
      return evaluator;
  });

  const pHDAssistantProfessors = aggregatedEvaluator.filter((evaluator) => {
    if (
      evaluator.populatedFaculty[0].title == "PHD Assistant Professor" &&
      evaluator.populatedFaculty[0].role !== "HOD" &&
      evaluator.populatedFaculty[0].role !== "DCO"
    )
      return evaluator;
  });
  const associateProfessors = aggregatedEvaluator.filter((evaluator) => {
    if (
      evaluator.populatedFaculty[0].title == "Associate Professor" &&
      evaluator.populatedFaculty[0].role !== "HOD" &&
      evaluator.populatedFaculty[0].role !== "DCO"
    )
      return evaluator;
  });
  const allEvaluators = [
    ...lecturers,
    ...assistantProfessors,
    ...pHDAssistantProfessors,
    ...associateProfessors,
  ];
  // console.log(allEvaluators);
  const data = await Promise.all(
    filteredGroups.map(async (group) => {
      // console.log(group);
      allEvaluators.sort((a, b) => a.groupNo - b.groupNo);
      // console.log(allEvaluators);
      for (let i = 0; i < allEvaluators.length; i++) {
        // console.log(group);
        // console.log(allEvaluators[i].populatedFaculty[0].developmentField);
        if (
          allEvaluators.length != 0 &&
          allEvaluators[i]._id.toString() !== group.gSupervisorId &&
          group.gDevelopmentArea.some((field) =>
            allEvaluators[i].populatedFaculty[0].developmentField.includes(
              field
            )
          )
          // allEvaluators[i].populatedFaculty[0].developmentField.includes(
          //   group.gDevelopmentArea
          // )
        ) {
          if (
            group.gAreaOfInterest.some((interest) =>
              allEvaluators[i].populatedFaculty[0].areaOfInterest.includes(
                interest
              )
            )
          ) {
            console.log(group);
            let arr = allEvaluators[i].groupList;
            arr.push(group.groupID);
            console.log(arr);

            let data2 = await Group.findOneAndUpdate(
              { _id: group.groupID },
              {
                $set: {
                  isAssignedPre: true,
                },
              },
              { returnOriginal: false }
            );

            let data3 = await PreEvaluator.findOneAndUpdate(
              {
                _id: allEvaluators[i].populatedFaculty[0]._id,
              },
              {
                $set: { groupList: arr },
              },
              { returnOriginal: false }
            );
            allEvaluators[i].groupNo += 1;
            return { proposal: data2, evaluator: data3 };
          }
        }
      }
    })
  );
  // console.log(data);
  // }
};

export const assignEvaluatorsForFypTwo = async (req, res) => {
  const proposals = await Proposal.find({
    reviewerStatus: "Approved",
  });
  const groups = await Group.find(
    { $and: [{ isAssignedTwo: false }, { isApprovedPre: "Approved" }] },
    { _id: 1 }
  );
  const faculty = await Faculty.find({ activeStatus: true });
  const groupArr = [];
  groups.map((group) => groupArr.push(group._id.toString()));
  const filteredGroups = [];
  proposals.forEach((proposal) => {
    if (groupArr.includes(proposal.groupId.toString()))
      filteredGroups.push({
        groupID: proposal.groupId.toString(),
        gDevelopmentArea: proposal.developmentArea,
        gAreaOfInterest: proposal.areaOfInterest,
        gSupervisorId: proposal.supervisorId.toString(),
        proposalPath: proposal.filepath,
      });
  });

  // console.log(filteredGroups);
  const evaluatorList = await EvaluatorTwo.find({}, { _id: 1 });

  const evaluators = [];

  evaluatorList.map((evaluator) => evaluators.push(evaluator._id.toString()));

  const filteredFaculty = faculty.filter((member) => {
    if (!evaluators.includes(member._id.toString())) return member;
  });

  await Promise.all(
    filteredFaculty.map(async (faculty) => {
      let addEvaluator = new EvaluatorTwo({
        _id: faculty._id,
      });
      await addEvaluator.save();
      return addEvaluator;
    })
  );
  // console.log(result);
  // if (result) {
  const aggregatedEvaluator = await EvaluatorTwo.aggregate([
    {
      $addFields: {
        groupNo: { $size: "$groupList" },
      },
    },
    {
      $sort: { groupNo: 1 },
    },
    {
      $lookup: {
        from: "faculties", // Name of the referenced collection
        localField: "_id",
        foreignField: "_id",
        as: "populatedFaculty",
      },
    },
  ]);
  // console.log(aggregatedEvaluator);
  const lecturers = aggregatedEvaluator.filter((evaluator) => {
    if (
      evaluator.populatedFaculty[0].title == "Lecturer" &&
      evaluator.populatedFaculty[0].role !== "HOD" &&
      evaluator.populatedFaculty[0].role !== "DCO"
    )
      //   console.log(evaluator.proposalNo);
      // evaluator.proposalNo += 1;
      return evaluator;
  });
  // console.log(lecturers);
  const assistantProfessors = aggregatedEvaluator.filter((evaluator) => {
    if (
      evaluator.populatedFaculty[0].title == "Assistant Professor" &&
      evaluator.populatedFaculty[0].role !== "HOD" &&
      evaluator.populatedFaculty[0].role !== "DCO"
    )
      return evaluator;
  });

  const pHDAssistantProfessors = aggregatedEvaluator.filter((evaluator) => {
    if (
      evaluator.populatedFaculty[0].title == "PHD Assistant Professor" &&
      evaluator.populatedFaculty[0].role !== "HOD" &&
      evaluator.populatedFaculty[0].role !== "DCO"
    )
      return evaluator;
  });
  const associateProfessors = aggregatedEvaluator.filter((evaluator) => {
    if (
      evaluator.populatedFaculty[0].title == "Associate Professor" &&
      evaluator.populatedFaculty[0].role !== "HOD" &&
      evaluator.populatedFaculty[0].role !== "DCO"
    )
      return evaluator;
  });
  const allEvaluators = [
    ...lecturers,
    ...assistantProfessors,
    ...pHDAssistantProfessors,
    ...associateProfessors,
  ];
  // console.log(allEvaluators);
  const data = await Promise.all(
    filteredGroups.map(async (group) => {
      // console.log(group);
      allEvaluators.sort((a, b) => a.groupNo - b.groupNo);
      // console.log(allEvaluators);
      for (let i = 0; i < allEvaluators.length; i++) {
        // console.log(group);
        // console.log(allEvaluators[i].populatedFaculty[0].developmentField);
        if (
          allEvaluators.length != 0 &&
          allEvaluators[i]._id.toString() !== group.gSupervisorId &&
          group.gDevelopmentArea.some((field) =>
            allEvaluators[i].populatedFaculty[0].developmentField.includes(
              field
            )
          )
          // allEvaluators[i].populatedFaculty[0].developmentField.includes(
          //   group.gDevelopmentArea
          // )
        ) {
          if (
            group.gAreaOfInterest.some((interest) =>
              allEvaluators[i].populatedFaculty[0].areaOfInterest.includes(
                interest
              )
            )
          ) {
            console.log(group);
            let arr = allEvaluators[i].groupList;
            arr.push(group.groupID);
            console.log(arr);

            let data2 = await Group.findOneAndUpdate(
              { _id: group.groupID },
              {
                $set: {
                  isAssignedTwo: true,
                },
              },
              { returnOriginal: false }
            );

            let data3 = await EvaluatorTwo.findOneAndUpdate(
              {
                _id: allEvaluators[i].populatedFaculty[0]._id,
              },
              {
                $set: { groupList: arr },
              },
              { returnOriginal: false }
            );
            allEvaluators[i].groupNo += 1;
            return { proposal: data2, evaluator: data3 };
          }
        }
      }
    })
  );
};

export const unassignGroupOne = async (req, res) => {
  const { gid, e_Id } = req.params;
  try {
    const update = await Group.updateOne(
      { _id: gid },
      {
        $set: {
          isAssignedOne: false,
        },
      }
    );
    const groupList = await Evaluator.findOne({ _id: e_Id }, { groupList: 1 });
    const storedList = groupList.groupList;
    let groupArr = storedList.filter((group) => {
      if (!group === gid) return group;
    });

    const update2 = await Evaluator.updateOne(
      { _id: e_Id },
      {
        $set: { groupList: groupArr },
      }
    );
    res.status(200).json(update2);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const unassignPreGroup = async (req, res) => {
  const { gid, e_Id } = req.params;
  try {
    const update = await Group.updateOne(
      { _id: gid },
      {
        $set: {
          isAssignedPre: false,
        },
      }
    );
    const groupList = await PreEvaluator.findOne(
      { _id: e_Id },
      { groupList: 1 }
    );
    const storedList = groupList.groupList;
    let groupArr = storedList.filter((group) => {
      if (!group === gid) return group;
    });

    const update2 = await PreEvaluator.updateOne(
      { _id: e_Id },
      {
        $set: { groupList: groupArr },
      }
    );
    res.status(200).json(update2);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const unassignGroupTwo = async (req, res) => {
  const { gid, e_Id } = req.params;
  try {
    const update = await Group.updateOne(
      { _id: gid },
      {
        $set: {
          isAssignedTwo: false,
        },
      }
    );
    const groupList = await EvaluatorTwo.findOne(
      { _id: e_Id },
      { groupList: 1 }
    );
    const storedList = groupList.groupList;
    let groupArr = storedList.filter((group) => {
      if (!group === gid) return group;
    });

    const update2 = await EvaluatorTwo.updateOne(
      { _id: e_Id },
      {
        $set: { groupList: groupArr },
      }
    );
    res.status(200).json(update2);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const assignGroupOne = async (req, res) => {
  const { gid, e_Id } = req.params;
  try {
    const check = await Evaluator.find({ groupList: gid });
    if (check.length !== 0)
      return res.status(500).json({ message: "Already assigned" });
    const update = await Group.updateOne(
      { _id: gid },
      {
        $set: {
          isAssignedOne: true,
        },
      }
    );
    const groupList = await Evaluator.findOne({ _id: e_Id }, { groupList: 1 });
    let storedList = groupList.groupList;
    storedList.push(gid);
    const update2 = await Evaluator.updateOne(
      { _id: e_Id },
      {
        $set: {
          groupList: storedList,
        },
      }
    );
    res.status(200).json(update2);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const assignPreGroup = async (req, res) => {
  const { gid, e_Id } = req.params;

  try {
    const check = await PreEvaluator.find({ groupList: gid });
    if (check.length !== 0)
      return res.status(500).json({ message: "Already assigned" });

    const update = await Group.updateOne(
      { _id: gid },
      {
        $set: {
          isAssignedPre: true,
        },
      }
    );
    const groupList = await PreEvaluator.findOne(
      { _id: e_Id },
      { groupList: 1 }
    );
    let storedList = groupList.groupList;

    storedList.push(gid);
    const update2 = await PreEvaluator.updateOne(
      { _id: e_Id },
      {
        $set: {
          groupList: storedList,
        },
      }
    );
    res.status(200).json(update2);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const assignGroupTwo = async (req, res) => {
  const { gid, e_Id } = req.params;

  try {
    const check = await EvaluatorTwo.find({ groupList: gid });
    if (check.length !== 0)
      return res.status(500).json({ message: "Already assigned" });
    const update = await Group.updateOne(
      { _id: gid },
      {
        $set: {
          isAssignedTwo: true,
        },
      }
    );

    const groupList = await EvaluatorTwo.findOne(
      { _id: e_Id },
      { groupList: 1 }
    );
    let storedList = groupList.groupList;

    storedList.push(gid);
    const update2 = await EvaluatorTwo.updateOne(
      { _id: e_Id },
      {
        $set: {
          groupList: storedList,
        },
      }
    );
    res.status(200).json(update2);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getEvaluatorsOne = async (req, res) => {
  try {
    const evaluators = await Evaluator.find().populate([
      { path: "groupList", model: Group },
      {
        path: "_id",
        model: Faculty,
        select: "name developmentField areaOfInterest title",
      },
    ]);
    res.status(200).json(evaluators);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getPreEvaluators = async (req, res) => {
  try {
    const evaluators = await PreEvaluator.find().populate([
      { path: "groupList", model: Group },
      {
        path: "_id",
        model: Faculty,
        select: "name developmentField areaOfInterest title",
      },
    ]);
    res.status(200).json(evaluators);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getEvaluatorsTwo = async (req, res) => {
  try {
    const evaluators = await EvaluatorTwo.find().populate([
      { path: "groupList", model: Group },
      {
        path: "_id",
        model: Faculty,
        select: "name developmentField areaOfInterest title",
      },
    ]);
    res.status(200).json(evaluators);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getEvaluatorOneGroups = async (req, res) => {
  const { user_id } = req.params;
  try {
    const list = await Evaluator.findOne(
      { _id: user_id },
      { groupList: 1 }
    ).populate([
      {
        path: "groupList",
        model: Group,
        select: "name supervisorId studentID",
        populate: [
          {
            path: "supervisorId",
            model: Supervisor,
            select: "_id",
            populate: {
              path: "_id",
              model: Faculty,
              select: "name",
            },
          },
          {
            path: "studentID",
            model: Student,
            select: "name",
          },
        ],
      },
    ]);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getEvaluatorPreGroups = async (req, res) => {
  const { user_id } = req.params;
  try {
    const list = await PreEvaluator.findOne(
      { _id: user_id },
      { groupList: 1 }
    ).populate([
      {
        path: "groupList",
        model: Group,
        select: "name supervisorId studentID",
        populate: [
          {
            path: "supervisorId",
            model: Supervisor,
            select: "name",
            populate: {
              path: "_id",
              model: Faculty,
              select: "name",
            },
          },
          {
            path: "studentID",
            model: Student,
            select: "name",
          },
        ],
      },
    ]);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getEvaluatorTwoGroups = async (req, res) => {
  const { user_id } = req.params;
  try {
    const list = await EvaluatorTwo.findOne(
      { _id: user_id },
      { groupList: 1 }
    ).populate([
      {
        path: "groupList",
        model: Group,
        select: "name supervisorId studentID",
        populate: [
          {
            path: "supervisorId",
            model: Supervisor,
            select: "name",
            populate: {
              path: "_id",
              model: Faculty,
              select: "name",
            },
          },
          {
            path: "studentID",
            model: Student,
            select: "name",
          },
        ],
      },
    ]);
    res.status(200).json(list);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
