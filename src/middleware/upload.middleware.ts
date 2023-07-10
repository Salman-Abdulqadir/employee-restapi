import multer, { FileFilterCallback } from "multer";
import fs from "fs";

// Specify the destination folder
const uploadFolder = "./src/uploads/";

// Create the destination folder if it doesn't exist
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Configure the destination folder and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Define the file filter to accept only CSV files
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Set up the multer middleware
export const uploadMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
}).any();
