import multer, { FileFilterCallback } from "multer";

// Configure the destination folder and filename
const storage = multer.memoryStorage();

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
