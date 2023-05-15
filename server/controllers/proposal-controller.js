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
          status: "Pending",
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
      res.send({ updateProposal });
    } else {
      const newProposal = new Proposal({
        supervisorId: req.body.supervisorsId,
        groupId: req.body.groupsId,
        filepath: req.body.proposalsPath,
        status: "Pending",
      });
      await newProposal.save();
      console.log(newProposal);
      res.send({ newProposal });
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
  let gameProposals = proposals.filter((proposal) => {
    if (proposal.developmentField == "Game Development") {
      return proposal;
    }
  });
  let webProposals = proposals.filter((proposal) => {
    if (proposal.developmentField == "Web Development") {
      return proposal;
    }
  });
  let mobileProposals = proposals.filter((proposal) => {
    if (proposal.developmentField == "Mobile Application Development") {
      return proposal;
    }
  });
  let webMobileProposals = proposals.filter((proposal) => {
    if (proposal.developmentField == "Web and Mobile Development") {
      return proposal;
    }
  });
  let systemProposals = proposals.filter((proposal) => {
    if (proposal.developmentField == "System Application Development") {
      return proposal;
    }
  });
  const reviewers = await Reviewer.find();
  let lecturers = reviewers.filter((reviewer) => {
    if (reviewer.title == "Lecturer") return reviewer;
  });

  let assistantProfessors = reviewers.filter((reviewer) => {
    if (reviewer.title == "Assistant Professor") return reviewer;
  });

  let pHDAssistantProfessors = reviewers.filter((reviewer) => {
    if (reviewer.title == "PHD Assistant Professor") return reviewer;
  });
  let associateProfessors = reviewers.filter((reviewer) => {
    if (reviewer.title == "Associate Professor" && reviewer.isHOD == false)
      return reviewer;
  });
};
