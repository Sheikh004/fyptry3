import Proposal from "../modal/Proposal.js";
import Reviewer from "../modal/Reviewer.js";
import Faculty from "../modal/Faculty.js";
import fs from "fs";

export const getSupervisorProposals = async (req, res) => {
  const { id } = req.params;
  try {
    const proposals = await Proposal.find({ supervisorId: id });
    res.send({ proposals });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const updateProposalStatus = async (req, res) => {
  const { approvalProposal } = req.params;
  console.log(approvalProposal);
  try {
    const proposal = await Proposal.findOneAndUpdate(
      { _id: approvalProposal },
      {
        $set: {
          status: "Approved",
        },
      },
      { returnOriginal: false }
    );
    console.log(proposal);
    res.send({ proposal });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const unUpdateProposalStatus = async (req, res) => {
  const { unApprovalProposal } = req.params;
  console.log(unApprovalProposal);
  try {
    const proposal = await Proposal.findOneAndUpdate(
      { _id: unApprovalProposal },
      {
        $set: {
          status: "Disapproved",
        },
      },
      { returnOriginal: false }
    );
    console.log(proposal);
    res.send({ proposal });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const createProposal = async (req, res) => {
  function removeSingleFile(fileName) {
    if (
      fileName.split(".").pop() === "jpeg" ||
      fileName.split(".").pop() === "png" ||
      fileName.split(".").pop() === "jpg"
    ) {
      fs.unlink(`./uploads/images/${fileName.split("/").pop()}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`${fileName} has been removed from the server.`);
      });
    } else {
      fs.unlink(`./uploads/files/${fileName.split("/").pop()}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`${fileName} has been removed from the server.`);
      });
    }
  }
  try {
    const existProposal = await Proposal.findOne({
      groupId: req.body.groupsId,
    });
    if (existProposal) {
      if (existProposal.filepath != "")
        removeSingleFile(existProposal.filepath);
      const updateProposal = await Proposal.findOneAndUpdate(
        { groupId: req.body.groupsId },
        {
          $set: {
            filepath: req.body.proposalsPath,
            status: "Pending",
          },
        },
        { returnOriginal: false }
      );
      res.send({
        proposal: updateProposal,
        message: `${req.body.groupName} have updated the proposal`,
      });
    } else {
      const newProposal = new Proposal({
        supervisorId: req.body.supervisorsId,
        groupId: req.body.groupsId,
        filepath: req.body.proposalsPath,
        status: "Pending",
      });
      await newProposal.save();
      console.log(newProposal);
      res.send({
        proposal: newProposal,
        message: `${req.body.groupName} have submitted the proposal`,
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const assignProposals = async (req, res) => {
  const proposals = await Proposal.find({
    $and: [{ status: "Approved" }, { isAssigned: false }],
  });
  const faculty = await Faculty.find({ activeStatus: true });

  const reviewerList = await Reviewer.find({}, { _id: 1 });

  const reviewers = [];

  reviewerList.map((reviewer) => reviewers.push(reviewer._id.toString()));

  const filteredFaculty = faculty.filter((member) => {
    if (!reviewers.includes(member._id.toString())) return member;
  });

  const result = await Promise.all(
    filteredFaculty.map(async (faculty) => {
      let addReviewer = new Reviewer({
        _id: faculty._id,
      });
      await addReviewer.save();
      return addReviewer;
    })
  );
  if (result) {
    const aggregatedReviewer = await Reviewer.aggregate([
      {
        $addFields: {
          proposalNo: { $size: "$proposalList" },
        },
      },
      {
        $sort: { proposalNo: 1 },
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
    console.log(aggregatedReviewer[0].populatedFaculty);
    const lecturers = aggregatedReviewer.filter((reviewer) => {
      if (
        reviewer.populatedFaculty[0].title == "Lecturer" &&
        reviewer.populatedFaculty[0].role !== "HOD" &&
        reviewer.populatedFaculty[0].role !== "DCO"
      )
        //   console.log(reviewer.proposalNo);
        // reviewer.proposalNo += 1;
        return reviewer;
    });
    // console.log(lecturers);
    const assistantProfessors = aggregatedReviewer.filter((reviewer) => {
      if (
        reviewer.populatedFaculty[0].title == "Assistant Professor" &&
        reviewer.populatedFaculty[0].role !== "HOD" &&
        reviewer.populatedFaculty[0].role !== "DCO"
      )
        return reviewer;
    });

    const pHDAssistantProfessors = aggregatedReviewer.filter((reviewer) => {
      if (
        reviewer.populatedFaculty[0].title == "PHD Assistant Professor" &&
        reviewer.populatedFaculty[0].role !== "HOD" &&
        reviewer.populatedFaculty[0].role !== "DCO"
      )
        return reviewer;
    });
    const associateProfessors = aggregatedReviewer.filter((reviewer) => {
      if (
        reviewer.populatedFaculty[0].title == "Associate Professor" &&
        reviewer.populatedFaculty[0].role !== "HOD" &&
        reviewer.populatedFaculty[0].role !== "DCO"
      )
        return reviewer;
    });
    const allReviewers = [
      ...lecturers,
      ...assistantProfessors,
      ...pHDAssistantProfessors,
      ...associateProfessors,
    ];
    console.log(allReviewers);
    const data = await Promise.all(
      proposals.map(async (proposal) => {
        allReviewers.sort((a, b) => a.proposalNo - b.proposalNo);
        console.log(allReviewers);
        for (let i = 0; i < allReviewers.length; i++) {
          if (
            allReviewers.length != 0 &&
            allReviewers[i]._id !== proposal.supervisorId &&
            proposal.developmentArea.some((field) =>
              allReviewers[i].populatedFaculty[0].developmentField.includes(
                field
              )
            )
            // allReviewers[i].populatedFaculty[0].developmentField.includes(
            //   proposal.developmentArea
            // )
          ) {
            if (
              proposal.areaOfInterest.some((interest) =>
                allReviewers[i].populatedFaculty[0].areaOfInterest.includes(
                  interest
                )
              )
            ) {
              let arr = allReviewers[i].proposalList;
              arr.push(proposal._id);
              let data2 = await Proposal.findOneAndUpdate(
                { _id: proposal._id },
                {
                  $set: {
                    isAssigned: true,
                  },
                },
                { returnOriginal: false }
              );

              let data3 = await Reviewer.findOneAndUpdate(
                {
                  _id: allReviewers[i].populatedFaculty[0]._id,
                },
                {
                  $set: { proposalList: arr },
                },
                { returnOriginal: false }
              );
              allReviewers[i].proposalNo += 1;
              return { proposal: data2, reviewer: data3 };
            }
          }
        }

        // for (let i = 0; i < assistantProfessors.length; i++) {
        //   if (
        //     assistantProfessors.length != 0 &&
        //     proposal.developmentField ==
        //       assistantProfessors[i].populatedFaculty[0].developmentField
        //   ) {
        //     if (
        //       proposal.areaOfInterest.some((interest) =>
        //         assistantProfessors[
        //           i
        //         ].populatedFaculty[0].areaOfInterest.includes(interest)
        //       )
        //     ) {
        //       let arr = assistantProfessors[i].proposalList;
        //       arr.push(proposal._id);
        //       let data2 = await Proposal.findOneAndUpdate(
        //         { _id: proposal._id },
        //         {
        //           $set: {
        //             isAssigned: true,
        //           },
        //         },
        //         { returnOriginal: false }
        //       );

        //       let data3 = await Reviewer.findOneAndUpdate(
        //         {
        //           _id: assistantProfessors[i].populatedFaculty[0]._id,
        //         },
        //         {
        //           $set: { proposalList: arr },
        //         },
        //         { returnOriginal: false }
        //       );
        //       return { proposal: data2, reviewer: data3 };
        //     }
        //   }
        // }

        // for (let i = 0; i < pHDAssistantProfessors.length; i++) {
        //   if (
        //     pHDAssistantProfessors.length != 0 &&
        //     proposal.developmentField ==
        //       pHDAssistantProfessors[i].populatedFaculty[0].developmentField
        //   ) {
        //     if (
        //       proposal.areaOfInterest.some((interest) =>
        //         pHDAssistantProfessors[
        //           i
        //         ].populatedFaculty[0].areaOfInterest.includes(interest)
        //       )
        //     ) {
        //       let arr = pHDAssistantProfessors[i].proposalList;
        //       arr.push(proposal._id);
        //       let data2 = await Proposal.findOneAndUpdate(
        //         { _id: proposal._id },
        //         {
        //           $set: {
        //             isAssigned: true,
        //           },
        //         },
        //         { returnOriginal: false }
        //       );

        //       let data3 = await Reviewer.findOneAndUpdate(
        //         {
        //           _id: pHDAssistantProfessors[i].populatedFaculty[0]._id,
        //         },
        //         {
        //           $set: { proposalList: arr },
        //         },
        //         { returnOriginal: false }
        //       );
        //       return { proposal: data2, reviewer: data3 };
        //     }
        //   }
        // }

        // for (let i = 0; i < associateProfessors.length; i++) {
        //   if (
        //     associateProfessors.length != 0 &&
        //     proposal.developmentField ==
        //       associateProfessors[i].populatedFaculty[0].developmentField
        //   ) {
        //     if (
        //       proposal.areaOfInterest.some((interest) =>
        //         associateProfessors[
        //           i
        //         ].populatedFaculty[0].areaOfInterest.includes(interest)
        //       )
        //     ) {
        //       let arr = associateProfessors[i].proposalList;
        //       arr.push(proposal._id);
        //       let data2 = await Proposal.findOneAndUpdate(
        //         { _id: proposal._id },
        //         {
        //           $set: {
        //             isAssigned: true,
        //           },
        //         },
        //         { returnOriginal: false }
        //       );

        //       let data3 = await Reviewer.findOneAndUpdate(
        //         {
        //           _id: associateProfessors[i].populatedFaculty[0]._id,
        //         },
        //         {
        //           $set: { proposalList: arr },
        //         },
        //         { returnOriginal: false }
        //       );
        //       console.log(data3);
        //       return { proposal: data2, reviewer: data3 };
        //     }
        //   }
        // }
      })
    );
    // console.log(data);
  }
};

export const removeProposal = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  console.log(id);
  function removeSingleFile(fileName) {
    if (
      fileName.split(".").pop() === "jpeg" ||
      fileName.split(".").pop() === "png" ||
      fileName.split(".").pop() === "jpg"
    ) {
      fs.unlink(`./uploads/images/${fileName.split("/").pop()}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`${fileName} has been removed from the server.`);
      });
    } else {
      fs.unlink(`./uploads/files/${fileName.split("/").pop()}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`${fileName} has been removed from the server.`);
      });
    }
  }

  try {
    const proposal = await Proposal.findOne({ _id: id });

    if (proposal) {
      removeSingleFile(name);
      const updatedProposal = await Proposal.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            filepath: "",
            status: "Pending",
          },
        },
        {
          returnOriginal: false,
        }
      );
      res.status(200).json(updatedProposal);
    }
  } catch (err) {
    res.send(err);
  }
};

export const getUnAssignedProposals = async (req, res) => {
  try {
    const proposalList = await Proposal.find({ isAssigned: false });
    return res.status(200).json(proposalList);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getReviewers = async (req, res) => {
  try {
    const reviewerList = await Reviewer.find().populate([
      {
        path: "_id",
        model: Faculty,
        select: "name title areaOfInterest developmentField role ",
      },
      {
        path: "proposalList",
        model: Proposal,
        select: "filepath areaOfInterest developmentArea",
      },
    ]);
    console.log(reviewerList);
    return res.status(200).json(reviewerList);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const assignProposal = async (req, res) => {
  const { pid, rid } = req.params;

  try {
    const checkR = await Reviewer.findOne({ _id: rid });
    const checkP = await Proposal.findOne({ _id: pid });
    if (checkR._id === checkP.supervisorId) {
      return res
        .status(403)
        .json({ message: "Supervisor and Reviewer cannot be same" });
    } else {
      const result2 = await Reviewer.updateOne(
        { _id: rid },
        {
          $push: {
            proposalList: pid,
          },
        }
      );

      const result = await Proposal.updateOne(
        { _id: pid },
        {
          $set: {
            isAssigned: true,
            reviewerStatus: "Pending",
          },
        }
      );
      return res.status(200).json({ result, result2 });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const unassignProposal = async (req, res) => {
  const { pid, rid } = req.params;
  console.log(pid, rid);
  try {
    const result = await Proposal.updateOne(
      { _id: pid },
      {
        $set: {
          isAssigned: false,
          reviewerStatus: "Pending",
        },
      }
    );

    const result2 = await Reviewer.updateOne(
      { _id: rid },
      {
        $pull: {
          proposalList: pid,
        },
      }
    );
    return res.status(200).json({ result, result2 });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getReviewerProposals = async (req, res) => {
  const { id } = req.params;
  try {
    const reviewer = await Reviewer.findOne({ _id: id }).populate([
      {
        path: "proposalList",
        model: Proposal,
        select: "filepath reviewerStatus groupId",
      },
    ]);
    return res.status(200).json(reviewer);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const updateProposalReviewerStatus = async (req, res) => {
  const { pid, value } = req.params;
  try {
    const updatedProposal = await Proposal.findOneAndUpdate(
      { _id: pid },
      {
        $set: {
          reviewerStatus: value,
        },
      },
      { returnOriginal: false }
    );
    return res.status(200).json(updatedProposal);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getGroupProposal = async (req, res) => {
  const { gid } = req.params;
  try {
    const proposal = await Proposal.findOne({ groupId: gid });
    return res.status(200).json(proposal);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
