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
