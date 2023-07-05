import Faculty from "../modal/Faculty.js";

export const fetchPref = async (req, res) => {
  const { f_id } = req.params;
  try {
    const prefer = await Faculty.findOne(
      { _id: f_id },
      { developmentField: 1, areaOfInterest: 1 }
    );
    res.status(200).json(prefer);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const updatePref = async (req, res) => {
  try {
    const uPref = await Faculty.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          developmentField: req.body.developmentField,
          areaOfInterest: req.body.areaOfInterest,
        },
      },
      { returnOriginal: false }
    );
    res.status(200).json(uPref);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
