import multer from "multer";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest;
    console.log(file.mimetype);
    if (file.mimetype.startsWith("image")) {
      dest = "uploads/images";
    } else {
      dest = "uploads/files";
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
export const upload = multer({ storage: fileStorage });
