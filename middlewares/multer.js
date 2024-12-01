import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const id = uuid();
    const extName = path.extname(file.originalname); // Safely get the extension
    const fileName = `${id}${extName}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept both video and image files
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed!"), false);
  }
};

export const uploadFiles = multer({ storage, fileFilter }).single("file");

