const express = require("express");
const axios = require("axios");
const router = express.Router();
const auth = require("../../../middleware/auth.js");
const Profile = require("../../../models/Profile.js");
const User = require("../../../models/User.js");
const { check, validationResult } = require("express-validator");
const { upload } = require("../../../utils/multer.js");
const { uploadAImageOnCloudinary } = require("../../../utils/cloudinary.js");

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar", "followers", "conversationIds"]
    );
    if (!profile) {
      return res.json({ msg: "there is no profile of this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});
router.post("/me", upload.single("profileImg"), auth, async (req, res) => {
  try {
    const upload = await uploadAImageOnCloudinary(req.file.path);

    if (upload) {
      const imgUrl = upload;
      let profile = await User.findOneAndUpdate(
        { user: req.user.id },
        { $set: { avatar: imgUrl } },
        { new: true }
      );

      if (profile) {
        res.status(200).json({ profile });
      }
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").notEmpty(),
      check("skills", "Skills is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      years,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    const profileFeilds = {};

    profileFeilds.user = req.user.id;
    if (company) profileFeilds.company = company;
    if (location) profileFeilds.location = location;
    if (years) profileFeilds.years = years;
    if (bio) profileFeilds.bio = bio;
    if (status) profileFeilds.status = status;
    if (githubusername) profileFeilds.githubusername = githubusername;

    if (skills) {
      profileFeilds.skills = skills;
    }
    if (website) {
      profileFeilds.website = website;
    }

    profileFeilds.social = {};
    if (youtube) profileFeilds.social.youtube = youtube;
    if (facebook) profileFeilds.social.facebook = facebook;
    if (twitter) profileFeilds.social.twitter = twitter;
    if (linkedin) profileFeilds.social.linkedin = linkedin;
    if (instagram) profileFeilds.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFeilds },
          { new: true }
        );

        return res.json(profile);
      }

      //creating a post
      profile = new Profile(profileFeilds);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }

    console.log(profileFeilds.skills);
  }
);

router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this id" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ error: err });
    }
    res.status(500).send("servor error");
  }
});

router.delete("/", auth, async (req, res) => {
  await Profile.findOneAndRemove({ user: req.user.id });

  await User.findOneAndRemove({ _id: req.user.id });

  res.json({ msg: "user deleted" });
});

// ADD_EXPERIENCE

router.put(
  "/experience",
  auth,
  check("title", "title is required").notEmpty(),
  check("company", "company is required").notEmpty(),
  check("from", " Date  is required").notEmpty(),

  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

// ADD_EDUCATION
router.put(
  "/education",
  auth,
  check("school", "school is required").notEmpty(),
  check("degree", "degree is required").notEmpty(),
  check("from", " Date  is required").notEmpty(),
  check("fieldofstudy", " Field of study is required").notEmpty(),

  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { school, degree, fieldofstudy, from, to, description } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      console.log("Id not found ");
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

router.put(
  "/experience/:eduId",
  auth,
  check("title", "school is required").notEmpty(),
  check("company", "degree is required").notEmpty(),
  check("from", " Date  is required").notEmpty(),
  check("location", " Field of study is required").notEmpty(),

  async (req, res) => {
    const error = validationResult(req);
    const target = req.params.eduId;
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    const newEdu = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      const index = profile.experience.findIndex((edu) => edu.id === target);

      if (index !== -1) {
        profile.experience[index] = newEdu;
      } else {
        console.log("Id not found ");
      }

      await profile.save();

      console.log("Id not found ");

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

router.put(
  "/education/:eduId",
  auth,
  check("school", "school is required").notEmpty(),
  check("degree", "degree is required").notEmpty(),
  check("from", " Date  is required").notEmpty(),
  check("fieldofstudy", " Field of study is required").notEmpty(),

  async (req, res) => {
    const error = validationResult(req);
    const target = req.params.eduId;
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { school, degree, fieldofstudy, from, to, description } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      const index = profile.education.findIndex((edu) => edu.id === target);

      if (index !== -1) {
        profile.education[index] = newEdu;
      } else {
        console.log("Id not found ");
      }

      await profile.save();

      console.log("Id not found ");

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

// router.delete('experience/:exp_id', auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user.id });
//     const removeIndex = profile.education
//       .map((item) => item.id)
//       .indexOf(req.params.exp_id);

//     profile.education.splice(removeIndex, 1);
//     await profile.save();

//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("servor error");
//   }
// });

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});
router.get("/github/:username", async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: `token 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`,
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: "No Github profile found" });
  }
});

module.exports = router;
