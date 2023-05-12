import Proposal from "../modal/Proposal.js";
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
