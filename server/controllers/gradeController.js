import Grade from "../modal/Grade.js";

export const grade = async (req, res) => {
  try {
    const grade = await Grade.findOne({ studentId: req.body.sId });
    if (grade) {
      const uGrade = Grade.findOneAndUpdate(
        { studentID: req.body.sId },
        {
          $set: {
            eGradeOne: req.body.gOne,
          },
        }
      );
      res.status(200).json(uGrade);
    } else {
      const newGrade = new Grade({
        studentID: req.body.id,
        eGradeOne: req.body.gOne,
      });
      res.status(200).json(newGrade);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
