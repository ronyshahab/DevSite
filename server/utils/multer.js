const multer = require("multer");

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
  const imageUpload = upload.single("profileImage");
  if (imageUpload) {
    imageUpload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: err.message });
      } else if (err) {
        return res
          .status(500)
          .json({ error: "Unknown error during file upload" });
      }
      return imageUpload;
    });
  }
};

module.exports = { upload, uploadImageToServer };
