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
const auth = require("../../../middleware/auth.js");

router.get("/", async (req, res) => {
  try {
    const user = await User.find().sort();
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const allUser = await User.find();
    const user = allUser.filter((user) => user.name.includes(username));
    const filteredUser = user.map((element) => {
      let payload = {
        name: element.name,
        avatar: element.avatar,
        id: element._id,
      };
      return payload;
    });
    res.send(filteredUser);
  } catch (err) {
    console.error(err.message);
    res.status(200).send("Server Error");
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
      let accountName = await User.findOne({ name });

      if (user) {
        return res.status(400).json({ error: "user already exist" });
      }
      if (accountName) {
        return res.status(400).json({ error: "Name is not available" });
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
        res.json({ token, email });
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err);
    }
  }
);

router.put("/follow/:id", auth, async (req, res) => {
  try {
    const requestedUser = req.params.id;

    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.followers.includes(requestedUser)) {
      return res.status(400).send("User is already followed");
    }

    user.followers.unshift(requestedUser);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
router.put("/unfollow/:id", auth, async (req, res) => {
  try {
    const requestedUser = req.params.id;

    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(400).send("User not found");
    }

    if (!user.followers.includes(requestedUser)) {
      return res.status(400).send("User is not followed");
    }

    user.followers.shift(requestedUser);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
