import { response } from "express";
const url = "http://localhost:8000";
export const createFileUrl2 = async (req, res) => {
  if (!req.file) return response.status(404).json("File not found");

  let dir;
  if (req.file.mimetype.startsWith("image")) dir = "/images";
  else dir = "/files";
  const fileUrl = `${url}/${dir}/${req.file.filename}`;

  return res.status(200).json(fileUrl);
};
