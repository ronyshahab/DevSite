const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../../models/User.js");
const cloudinary = require("../../../utils/cloudinary.js");
const { uploadAImageOnCloudinary } = require("../../../utils/cloudinary.js");
const { upload } = require("../../../utils/multer.js");

router.get("/", async (req, res) => {
  try {
    const user = await User.find().sort();
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.find({ email: email });
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.post(
  "/",
  upload.single("profileImage"),
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password must be atlest 6 letters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ error: "user already exist" });
      }

      if (req.file) {
        const upload = await uploadAImageOnCloudinary(req.file.path);
        user = new User({
          name,
          email,
          password,
          avatar: upload,
        });
      } else {
        const avatar = gravatar.url(email, {
          s: 200,
          r: "pg",
          d: "mm",
        });
        user = new User({
          name,
          email,
          password,
          avatar: avatar,
        });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("server issue");
    }
  }
);

module.exports = router;
