import Template from "../modal/Template.js";

export const createTemplate = (req, res) => {
  const { title, supervisedBy } = req.body;
  const imagePath = req.file ? req.file.filename : null;
  console.log(imagePath);
  let dir;
  if (req.file.mimetype.startsWith("image")) dir = "/images";
  else dir = "/files";
  const newTemplate = new Template({
    title,
    supervisedBy,
    image: `http://localhost:8000/${dir}/${imagePath}`,
  });

  newTemplate
    .save()
    .then(() => {
      res.status(200).json({ message: "Template created successfully" });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

export const fetchTemplate = async (req, res) => {
  try {
    const temp = await Template.find();
    console.log(temp);
    res.status(200).json(temp);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
