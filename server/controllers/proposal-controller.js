import proposal from "../modal/Proposal.js";
import Proposal from "../modal/Proposal.js";
import Reviewer from "../modal/Reviewer.js";
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
  try {
    const existProposal = await Proposal.findOne({
      groupId: req.body.groupsId,
    });
    if (existProposal) {
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

  const reviewers = await Reviewer.find();
  let lecturers = reviewers.filter((reviewer) => {
    if (reviewer.title == "Lecturer") return reviewer;
  });

  const assistantProfessors = reviewers.filter((reviewer) => {
    if (reviewer.title == "Assistant Professor") return reviewer;
  });

  const pHDAssistantProfessors = reviewers.filter((reviewer) => {
    if (reviewer.title == "PHD Assistant Professor") return reviewer;
  });
  const associateProfessors = reviewers.filter((reviewer) => {
    if (reviewer.title == "Associate Professor" && reviewer.isHOD == false)
      return reviewer;
  });
  const data = await Promise.all(
    proposals.map(async (proposal) => {
      for (let i = 0; i < lecturers.length; i++) {
        if (
          lecturers.length != 0 &&
          proposal.developmentField == lecturers[i].developmentField
        ) {
          if (
            proposal.areaOfInterest.some((interest) =>
              lecturers[i].areaOfInterest.includes(interest)
            )
          ) {
            let arr = lecturers[i].proposalList;
            arr.push(proposal._id);
            const data2 = await Proposal.findOneAndUpdate(
              { _id: proposal._id },
              {
                $set: {
                  isAssigned: true,
                },
              },
              { returnOriginal: false }
            );

            const data3 = await Reviewer.findOneAndUpdate(
              {
                _id: lecturers[i]._id,
              },
              {
                $set: { proposalList: arr },
              },
              { returnOriginal: false }
            );
            return { proposal: data2, reviewer: data3 };
          }
        }
      }

      for (let i = 0; i < assistantProfessors.length; i++) {
        if (
          assistantProfessors.length != 0 &&
          proposal.developmentField == assistantProfessors[i].developmentField
        ) {
          if (
            proposal.areaOfInterest.some((interest) =>
              assistantProfessors[i].areaOfInterest.includes(interest)
            )
          ) {
            let arr = assistantProfessors[i].proposalList;
            arr.push(proposal._id);
            const data2 = await Proposal.findOneAndUpdate(
              { _id: proposal._id },
              {
                $set: {
                  isAssigned: true,
                },
              },
              { returnOriginal: false }
            );

            const data3 = await Reviewer.findOneAndUpdate(
              {
                _id: assistantProfessors[i]._id,
              },
              {
                $set: { proposalList: arr },
              },
              { returnOriginal: false }
            );
            return { proposal: data2, reviewer: data3 };
          }
        }
      }

      for (let i = 0; i < pHDAssistantProfessors.length; i++) {
        if (
          pHDAssistantProfessors.length != 0 &&
          proposal.developmentField ==
            pHDAssistantProfessors[i].developmentField
        ) {
          if (
            proposal.areaOfInterest.some((interest) =>
              pHDAssistantProfessors[i].areaOfInterest.includes(interest)
            )
          ) {
            let arr = pHDAssistantProfessors[i].proposalList;
            arr.push(proposal._id);
            const data2 = await Proposal.findOneAndUpdate(
              { _id: proposal._id },
              {
                $set: {
                  isAssigned: true,
                },
              },
              { returnOriginal: false }
            );

            const data3 = await Reviewer.findOneAndUpdate(
              {
                _id: pHDAssistantProfessors[i]._id,
              },
              {
                $set: { proposalList: arr },
              },
              { returnOriginal: false }
            );
            return { proposal: data2, reviewer: data3 };
          }
        }
      }

      for (let i = 0; i < associateProfessors.length; i++) {
        if (
          associateProfessors.length != 0 &&
          proposal.developmentField == associateProfessors[i].developmentField
        ) {
          if (
            proposal.areaOfInterest.some((interest) =>
              associateProfessors[i].areaOfInterest.includes(interest)
            )
          ) {
            let arr = associateProfessors[i].proposalList;
            arr.push(proposal._id);
            const data2 = await Proposal.findOneAndUpdate(
              { _id: proposal._id },
              {
                $set: {
                  isAssigned: true,
                },
              },
              { returnOriginal: false }
            );

            const data3 = await Reviewer.findOneAndUpdate(
              {
                _id: associateProfessors[i]._id,
              },
              {
                $set: { proposalList: arr },
              },
              { returnOriginal: false }
            );
            return { proposal: data2, reviewer: data3 };
          }
        }
      }
    })
  );

  console.log(data);
};
