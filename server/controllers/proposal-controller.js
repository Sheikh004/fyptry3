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
