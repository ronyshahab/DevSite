const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadImageToServer = (req, res, next) => {
  // console.log(req);
  const imageUpload = upload.single("profileImage");
  console.log(imageUpload);
  if (imageUpload) {
    imageUpload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: err.message });
      } else if (err) {
        // An unknown error occurred
        return res
          .status(500)
          .json({ error: "Unknown error during file upload" });
      }
      return imageUpload;
      next();
    });
  }
};

module.exports = { upload, uploadImageToServer };
